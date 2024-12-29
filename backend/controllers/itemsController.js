import axios from "axios";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

// Controller to handle item search
export const searchItems = async (req, res) => {
  const { query, category, lat, lon } = req.query;
  const radius = 5000; // 5 km radius in meters

  try {
    console.log(`Searching for: ${query} ${category} near ${lat}, ${lon}`);
    const response = await axios.get(NOMINATIM_URL, {
      params: {
        q: `${query} ${category}`, // Combine query and categoryQ
        format: "json",
        lat,
        lon,
        addressdetails: 1,
        limit: 10, // Limit to 10 results
        radius, // Search radius in meters
      },
    });

    console.log("Nominatim response:", response.data); // Log the response data
    const results = response.data.map((item) => ({
      id: item.place_id,
      name: item.display_name,
      latitude: item.lat,
      longitude: item.lon,
      distance: item.dist || "Unknown distance",
      description: item.type, // Type of place returned
    }));

    res.json(results);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items", error });
  }
};
