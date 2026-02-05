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
