import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as nftService from "../services/nftService";

const Nft = () => {
  const createNfts = async (values) => {
    values.sold = 0;
    await nftService.createNFT(values);
  };

  return (
    <div class="jumbotron app">
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3 pt-12">
            <Formik
              initialValues={{
                id: "",
                name: "",
                description: "",
                image: "",
                animation_url: "",
                rarity: "",
                edition: "",
                category: "",
                type: "",
                frames: "",
              }}
              validationSchema={Yup.object().shape({
                id: Yup.number().required("Token is required"),
                name: Yup.string().required("Name is required"),
                description: Yup.string().required("Description is required"),
                image: Yup.string().required("Image URL is required"),
                animation_url: Yup.string().required(
                  "Animation URL is required"
                ),
                edition: Yup.string().required("Collection is required"),
                category: Yup.string().required("Category is required"),
                type: Yup.string().required("Type is required"),
                rarity: Yup.string().required("Rarity is required"),
                frames: Yup.number()
              })}
              onSubmit={(fields) => {
                alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
                createNfts(fields);
              }}
              render={({ errors, values, touched, setFieldValue }) => (
                <Form>
                  <h3>OpenSea Metadata</h3>
                  <div className="form-group my-4">
                    <label htmlFor="token">Token ID</label>
                    <Field
                      name="id"
                      type="number"
                      className={
                        "form-control" +
                        (errors.id && touched.id ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="id"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className={
                        "form-control" +
                        (errors.name && touched.name ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="description">Description</label>
                    <Field
                      name="description"
                      type="text"
                      className={
                        "form-control" +
                        (errors.description && touched.description
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="image">Image URL</label>
                    <Field
                      name="image"
                      type="text"
                      className={
                        "form-control" +
                        (errors.image && touched.image ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="animation_url">Animation URL</label>
                    <Field
                      name="animation_url"
                      type="text"
                      className={
                        "form-control" +
                        (errors.animation_url && touched.animation_url
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="animation_url"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <h4>Attributes</h4>
                  <div className="form-group my-4">
                    <label htmlFor="rarity">Rarity</label>
                    <Field
                      name="rarity"
                      type="text"
                      className={
                        "form-control" +
                        (errors.rarity && touched.rarity ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="rarity"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="edition">Collection</label>
                    <Field
                      name="edition"
                      type="text"
                      className={
                        "form-control" +
                        (errors.edition && touched.edition ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="edition"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="category">Category</label>
                    <Field
                      name="category"
                      type="text"
                      className={
                        "form-control" +
                        (errors.category && touched.category
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="type">Type</label>
                    <Field
                      name="type"
                      type="text"
                      className={
                        "form-control" +
                        (errors.type && touched.type ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <h4>Architecture Attributes</h4>
                  <p style={{ fontSize: "12px" }}>
                    Leave empty unless type = "Architecture"
                  </p>
                  <div className="form-group my-4">
                    <label htmlFor="token">Frames</label>
                    <Field
                      name="frames"
                      type="number"
                      className={
                        "form-control" +
                        (errors.frames && touched.frames ? " is-invalid" : "")
                      }
                    />
                  </div>
                  <div
                    className="form-group"
                    class="mt-4"
                    style={{ marginBottom: "100px" }}
                  >
                    <button type="submit" className="btn btn-primary mr-2">
                      Add
                    </button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nft;
