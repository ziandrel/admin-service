import {
  getAllBusinesses,
  updateBusinessStatus,
} from "../model/businessModel.js";

export const fetchBusiness = async (req, res) => {
  try {
    const businesses = await getAllBusinesses();

    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ message: "No businesses found." });
    }

    // Parse categories if needed
    const parsedBusinesses = businesses.map((b) => {
      if (b.categories && typeof b.categories === "string") {
        try {
          b.categories = JSON.parse(b.categories);
        } catch {
          b.categories = [];
        }
      }
      return b;
    });

    res.status(200).json(parsedBusinesses); // ✅ Return array
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const changeBusinessStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    await updateBusinessStatus(id, status);
    res.status(200).json({ message: "Business status updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
