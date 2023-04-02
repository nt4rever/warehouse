let homePage = async (req, res) => {
  return res.status(200).json({
    message: "this is homepage",
  });
};

export default { homePage };
