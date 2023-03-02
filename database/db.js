const mongoose = require("mongoose");

const favSchema = mongoose.Schema({
  ref_id: String,
  detail: Object,
  image: String,
});

const addToFavorites = async (data) => {
  let favorite = {
    ref_id: data.ref_id,
    detail: data.detail,
    image: data.image,
  };

  const exists = await Favs.findOne({ ref_id: data.ref_id });

  if (exists) {
    console.log("gym already exists in favorites");
  } else {
    return Favs.create(favorite);
  }
};

const getFavorites = () => {
  return Favs.find({});
}

const deleteFromFavorites = (input) => {
  let removed = input.ref_id;
  return Favs.deleteOne({ref_id: removed})
}

const Favs = mongoose.model("Favs", favSchema);

module.exports = { Favs, addToFavorites, getFavorites, deleteFromFavorites };
