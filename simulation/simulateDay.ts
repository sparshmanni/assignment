import { OPDService } from "../services/opdServices";
import { getPriority } from "../utils/priority";

// normal bookings
OPDService.bookToken("d1","09:00-10:00",{
 id:"t1", patientName:"Amit", source:"ONLINE",
 priority:getPriority("ONLINE"), status:"ACTIVE"
});

OPDService.bookToken("d1","09:00-10:00",{
 id:"t2", patientName:"Rohit", source:"PAID",
 priority:getPriority("PAID"), status:"ACTIVE"
});

// emergency comes
OPDService.bookToken("d1","09:00-10:00",{
 id:"t3", patientName:"EmergencyCase", source:"EMERGENCY",
 priority:getPriority("EMERGENCY"), status:"ACTIVE"
});


console.log("\n===== FINAL OPD SCHEDULE =====\n");

OPDService.getDoctors().forEach(doctor => {
  console.log(`Doctor: ${doctor.name}`);
  doctor.slots.forEach(slot => {
    console.log(`  Slot: ${slot.time}`);
    slot.tokens.forEach(token => {
      console.log(
        `    Token ${token.id} | ${token.patientName} | ${token.source} | Priority ${token.priority} | Status ${token.status}`
      );
    });
  });
  console.log("\n");
});

