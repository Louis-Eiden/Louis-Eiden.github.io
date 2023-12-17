.project-detail {
    display: flex;
    margin: 10rem 0 10rem 10rem;
  }
  
  .project-detail:nth-of-type(odd) {
    flex-direction: row-reverse;
    margin: 10rem 10rem 10rem 0;
  }


const WorldTalesImages = require.context(
  "../assets/projects/WorldTales",
  false,
  /\.(jpg|jpeg|png)$/
);

const WorldTales = WorldTalesImages.keys().map((key) => WorldTalesImages(key));

<section id="project_details">
  {projectData.map((data, index) => (
    <div
      key={index}
      className={`project-details ${index === activeIndex ? "active" : ""}`}
    >
      {index === activeIndex && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -400 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="description"
          >
            <p
              dangerouslySetInnerHTML={{
                __html: language === "english" ? data.text_en : data.text_de,
              }}
            />
          </motion.div>
          <motion.div className="project-detail">
            <img
              className="project-img"
              src={WorldTales[0]}
              alt="WorldTales Image 1"
            />
            <p className="project-img-description">
              this is a placeholder text for Image description.
            </p>
          </motion.div>
          <motion.div className="project-detail">
            <img
              className="project-img"
              src={WorldTales[0]}
              alt="WorldTales Image 2"
            />
            <p className="project-img-description">
              this is a placeholder text for Image description.
            </p>
          </motion.div>
          <motion.div className="project-detail">
            <img
              className="project-img"
              src={WorldTales[0]}
              alt="WorldTales Image 3"
            />
            <p className="project-img-description">
              this is a placeholder text for Image description.
            </p>
          </motion.div>
          <motion.div className="project-detail">
            <img
              className="project-img"
              src={WorldTales[0]}
              alt="WorldTales Image 4"
            />
            <p className="project-img-description">
              this is a placeholder text for Image description.
            </p>
          </motion.div>
          <motion.div className="project-detail">
            <img
              className="project-img"
              src={WorldTales[0]}
              alt="WorldTales Image 5"
            />
            <p className="project-img-description">
              this is a placeholder text for Image description.
            </p>
          </motion.div>
          <motion.div className="project-detail">
            <img
              className="project-img"
              src={WorldTales[0]}
              alt="WorldTales Image 6"
            />
            <p className="project-img-description">
              this is a placeholder text for Image description.
            </p>
          </motion.div>
        </>
      )}
    </div>
  ))}
</section>;
