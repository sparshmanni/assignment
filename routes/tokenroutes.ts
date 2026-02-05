import express from "express";
import { OPDService } from "../services/opdService";
import { getPriority } from "../utils/priority";

const router = express.Router();

// book token
router.post("/tokens", (req, res) => {
  try {
    const { doctorId, slotTime, patientName, source } = req.body;

    OPDService.bookToken(doctorId, slotTime, {
      id: Date.now().toString(),
      patientName,
      source,
      priority: getPriority(source),
      status: "ACTIVE"
    });

    res.json({ success: true, message: "Token booked" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// emergency booking
router.post("/emergency", (req, res) => {
  try {
    const { doctorId, slotTime, patientName } = req.body;

    OPDService.bookToken(doctorId, slotTime, {
      id: Date.now().toString(),
      patientName,
      source: "EMERGENCY",
      priority: 1,
      status: "ACTIVE"
    });

    res.json({ success: true, message: "Emergency token added" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// cancel token
router.post("/cancel", (req, res) => {
  try {
    const { doctorId, slotTime, tokenId } = req.body;

    OPDService.cancelToken(doctorId, slotTime, tokenId);

    res.json({ success: true, message: "Token cancelled" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// no show
router.post("/noshow", (req, res) => {
  try {
    const { doctorId, slotTime, tokenId } = req.body;

    OPDService.markNoShow(doctorId, slotTime, tokenId);

    res.json({ success: true, message: "Marked as no-show" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// get full schedule
router.get("/doctors", (_req, res) => {
  res.json(OPDService.getDoctors());
});

export default router;
