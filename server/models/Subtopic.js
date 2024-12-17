const SubtopicSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    preview: Boolean,
    videoUrl: String,
    duration: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtopic", SubtopicSchema);
