# 🏥 OPD Token Allocation Engine

## 📌 Overview
This project is a backend implementation of an OPD (Outpatient Department) token allocation system designed to simulate real-world hospital scheduling.

In hospitals, doctors operate within fixed time slots and each slot has a limited capacity. Patients can come from different sources such as online booking, walk-ins, paid priority, follow-ups, and emergencies. Managing all of this dynamically while ensuring fairness and priority handling is the main goal of this system.

The system focuses on building a clean and scalable backend service that can handle token allocation, priority management, slot limits, and real-world cases like cancellations, no-shows, and emergency insertions.

---

## 🚀 Features Implemented

### 1. Slot-based Allocation
- Each doctor operates in fixed time slots (e.g., 9–10 AM)
- Every slot has a maximum capacity
- Tokens are allocated within strict slot limits

### 2. Multiple Booking Sources
Tokens can be generated from:
- Online booking  
- Walk-in patients  
- Paid priority patients  
- Follow-up patients  
- Emergency patients  

Each source is assigned a priority to ensure proper ordering.

---

## 🎯 Prioritization Logic

| Token Source | Priority |
|-------------|----------|
| Emergency | 1 (Highest) |
| Paid | 2 |
| Follow-up | 3 |
| Online | 4 |
| Walk-in | 5 |

**Lower number = higher priority**

### Rules followed:
- If slot has capacity → token is added normally  
- If slot is full → priority is checked  
- Higher priority token replaces lower priority token  
- Displaced token moves to next available slot  
- Emergency tokens always get highest preference  

---

## 🔁 Elastic Capacity Handling

The system dynamically adjusts tokens when conditions change:

### When slot becomes full
- New high-priority token can replace lower-priority token  
- Removed token is moved to next available slot  

### When emergency token arrives
- Always inserted even if slot is full  
- Lowest priority token gets shifted  

### If no slot available
- Token is marked cancelled  

This ensures flexible and real-world scheduling behavior.

---

## ❌ Cancellation Handling
If a token is cancelled:
- It is removed from the slot  
- Slot capacity is freed  
- Space becomes available for new tokens  


**API:**
POST /api/cancel

---

## 👻 No-show Handling
If a patient does not show up:
- Token marked as NO_SHOW  
- Removed from slot  
- Capacity becomes available  

**API:**
POST /api/noshow

---

## 🚨 Emergency Handling
Emergency tokens:
- Highest priority  
- Can override existing bookings  
- May cause reallocation of lower priority tokens  

**API:**
POST /api/emergency

---

## 🧠 Algorithm Approach

The system uses a priority-based allocation strategy.

### Steps:
1. Validate doctor and slot  
2. Check slot capacity  
3. If capacity available → assign token  
4. If full → compare priorities  
5. Replace lowest priority if required  
6. Reallocate displaced token to next slot  
7. If no slot available → cancel token  

This ensures fairness, flexibility, and real-world practicality.

---

## 🏗️ Project Structure
/
├── models/ → Data models (Doctor, Slot, Token)
├── engine/ → Core allocation logic
├── services/ → Business logic
├── routes/ → API endpoints
├── utils/ → Priority logic
├── simulation/ → OPD day simulation
├── app.ts
└── server.ts

The project is structured in a modular way to keep logic clean and scalable.

---

## 🔌 API Endpoints


Emergency Token
POST /api/emergency
Cancel Token
POST /api/cancel
Mark No-show
POST /api/noshow
Get Full Schedule
GET /api/doctors


##🧪 Simulation of One OPD Day
#A simulation file is included to demonstrate:

Multiple doctors

Slot capacity handling

Priority-based allocation

Emergency insertion

Token reallocation

##Run simulation:

- npx ts-node src/simulation/simulateDay.ts
- This prints the final OPD schedule in the console.

##⚙️ How to Run Project
Install dependencies:

npm install
Run server:

npm run dev
Server runs at:

http://localhost:3000
⚖️ Assumptions & Trade-offs
Assumptions
Fixed slot timings

One doctor per slot

Immediate reallocation allowed

No frontend included

Trade-offs
In-memory storage used for simplicity

Focus kept on algorithm and backend logic

Easily extendable to database if required

##🏁 Conclusion
This project demonstrates a scalable and flexible OPD token allocation engine that handles real-world scheduling challenges using priority-based allocation and dynamic slot management.

