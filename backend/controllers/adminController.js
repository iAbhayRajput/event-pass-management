const someFunction = async (req, res) => {
    try {
      // Your logic here
      res.status(200).json({ message: "Success" });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };
  
  // ✅ Correctly export the functions
  module.exports = {
    someFunction,
  };
  