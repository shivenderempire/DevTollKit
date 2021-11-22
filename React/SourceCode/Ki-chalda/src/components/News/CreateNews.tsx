import React, { useState, useEffect, useCallback, useMemo } from "react";

import NewsPreview from "./NewsPreview";
//import ImageUpload from "../UI/ImageUpload/ImageUpload";
import ImageUploadSimple from "../UI/ImageUpload/ImageUploadSimple";
import InputHeader from "../UI/InputHeader/InputHeader";
import Inputcontent from "../UI/InputContent/InputContent";
import VideoUpload from "../UI/VideoUpload/VideoUpload";
import * as bootstrap from "react-bootstrap";

import { ICheckBoxList } from "../../interfaces/IcheckboxList";
import CheckBoxList from "../UI/CheckBox/CheckBox";
import axios from "../../serviceCall/axiosEdusoftClean";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { more as More, add as Add } from "../../lib/ImageConstants";

import Select from "react-select";
import Swal from "sweetalert2";
// Require Editor JS files.
// import 'froala-editor/js/froala_editor.pkgd.min.js';

// // Require Editor CSS files.
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import FroalaEditor from 'react-froala-wysiwyg';

const CreateNews = () => {
  const [categoryList, setCategoryList] = useState<any>(null);
  const [subcategoryList, setSubCategoryList] = useState<any>(null);
  const [subsubcategoryList, setSubsubCategoryList] = useState<any>(null);
  const [newsAuthorList, setNewsAuthorList] = useState<any>({
    selectedVal: "",
    items: null,
  });

  const [newsPrimaryCategoryList, setNewsPrimaryCategoryList] = useState<any>({
    selectedVal: "",
    items: null,
  });
  const [newsFinal, setnewsFinal] = useState<any>(null);

  const [newsUpload, setNewsUpload] = useState<any>({
    newsDate: new Date(),
    newsTime: "",
    newsSlug: "",
    newsTag: "",
    newsSynopsis: "",
  });
  const initialNewsPost = [
    {
      index: 1,
      elementType: "inputHeading",
      id: "FeatureHeading",
      elementConfig: { placeholder: "Enter Post Heading" },
      headingSize: "h1",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      headerText: "Feature Heading",
    },
    {
      index: 2,
      elementType: "image",
      id: "FeatureImage",
      value: null,
      validation: {
        required: true,
        cropRequired: true,
      },
      headerText: "Feature Image",
      imageCaption: "",
      imageCrop: "",
    },
    {
      index: 3,
      elementType: "input",
      id: "FeatureParaGraph",
      elementConfig: { type: "text", placeholder: "Enter Main Paragraph" },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      headerText: "Feature Paragraph",
    },
  ];
  const [newsPost, setNewsPost] = useState(initialNewsPost);
  const [isClear, setIsClear] = useState<boolean>(false);

  const categoryListLoader = () => {
    axios
      .get("/CreateNews/NewsCategoryList")
      .then((resp: any) => {
        if (
          (resp.success as boolean) === true &&
          (resp.message as string) === "ok"
        ) {
          //console.log(resp.data);
          setNewsPrimaryCategoryList({ selectedVal: "", items: resp.data });
          setCategoryList(
            resp.data.map((item: any, index: number) => {
              return { ...item, isChecked: false, key: { index } };
            }),
          );
        }
      })
      .catch((err) => {});
  };

  const authorListLoader = () => {
    axios
      .get("/AuthorMaster/getAuthorList")
      .then((resp: any) => {
        if (
          (resp.success as boolean) === true &&
          (resp.message as string) === "ok"
        ) {
          setNewsAuthorList({ selectedVal: "", items: resp.data });
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    categoryListLoader();
    authorListLoader();
  }, []);

  const SubCategoryLoader = (categoryIds: string) => {
    if (categoryIds.trim() !== "") {
      axios
        .get(`CreateNews/NewsSubCategoryList?categoryIds=${categoryIds}`)
        .then((resp: any) => {
          if (
            (resp.success as boolean) === true &&
            (resp.message as string) === "ok"
          ) {
            setSubCategoryList(
              resp.data.map((item: any, index: number) => {
                return { ...item, isChecked: false, key: { index } };
              }),
            );
          }
        })
        .catch((err: any) => {});
    } else {
      setSubCategoryList(null);
    }
  };

  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      let categorySelected: string = "";
      categoryList
        .filter((filter: any) => filter.isChecked === true)
        .forEach((element: any) => {
          categorySelected += "," + element.value;
        });
      categorySelected = categorySelected.substring(1);

      SubCategoryLoader(categorySelected);
    }
  }, [categoryList]);

  const SubsubCategoryLoader = (subcategoryIds: string) => {
    if (subcategoryIds.trim() !== "") {
      axios
        .get(
          `CreateNews/NewsSubSubCategoryList?subcategoryIds=${subcategoryIds}`,
        )
        .then((resp: any) => {
          if (
            (resp.success as boolean) === true &&
            (resp.message as string) === "ok"
          ) {
            setSubsubCategoryList(
              resp.data.map((item: any, index: number) => {
                return { ...item, isChecked: false, key: { index } };
              }),
            );
          }
        })
        .catch((err: any) => {});
    } else {
      setSubsubCategoryList(null);
    }
  };
  useEffect(() => {
    if (subcategoryList && subcategoryList.length > 0) {
      let subcategorySelected: string = "";
      subcategoryList
        .filter((filter: any) => filter.isChecked === true)
        .forEach((element: any) => {
          subcategorySelected += "," + element.value;
        });
      subcategorySelected = subcategorySelected.substring(1);

      SubsubCategoryLoader(subcategorySelected);
    }
  }, [subcategoryList]);

  const CategoryListCheckedHandler = useCallback(
    (selectedValue: string, isChecked: boolean) => {
      let catList: Array<ICheckBoxList> = [...categoryList];
      catList.forEach((item) => {
        if (item.value === selectedValue) {
          item.isChecked = isChecked;
        }
      });
      setCategoryList(catList);
    },
    [categoryList],
  );

  const SubCategoryListCheckedHandler = useCallback(
    (selectedValue: string, isChecked: boolean) => {
      let catList: Array<ICheckBoxList> = [...subcategoryList];
      catList.forEach((item) => {
        if (item.value === selectedValue) {
          item.isChecked = isChecked;
        }
      });
      setSubCategoryList(catList);
    },
    [subcategoryList],
  );

  const SubSubCategoryListCheckedHandler = useCallback(
    (selectedValue: string, isChecked: boolean) => {
      let catList: Array<ICheckBoxList> = [...subsubcategoryList];
      catList.forEach((item) => {
        if (item.value === selectedValue) {
          item.isChecked = isChecked;
        }
      });
      setSubsubCategoryList(catList);
    },
    [subsubcategoryList],
  );

  useEffect(() => {
    //console.log("Final array", newsPost);
    let newsTemplate = {};
    const FeatureHeadingfilter = newsPost.filter(
      (filter) => filter.id === "FeatureHeading",
    )[0];
    const FeatureHeading = {
      FeatureHeading: FeatureHeadingfilter.value,
      headingSize: FeatureHeadingfilter.headingSize,
    };
    const FeatureImage = newsPost.filter(
      (filter) => filter.id === "FeatureImage",
    )[0].value;

    const FeatureImageCaption = newsPost.filter(
      (filter) => filter.id === "FeatureImage",
    )[0].imageCaption;
    const FeatureImageCrop = newsPost.filter(
      (filter) => filter.id === "FeatureImage",
    )[0].imageCrop;
    //const FeatureParaGraph = newsPost.filter(filter => filter.id === "FeatureParaGraph")[0].value;

    const OtherDetails = newsPost.filter(
      (filter) =>
        filter.id !== "FeatureHeading" && filter.id !== "FeatureImage",
      //    && filter.id !== "FeatureParaGraph"
    );

    newsTemplate = {
      ...newsTemplate,
      FeatureHeading: FeatureHeading,
      FeatureImage: FeatureImage,
      FeatureImageCaption: FeatureImageCaption,
      FeatureImageCrop: FeatureImageCrop,
      //  FeatureParaGraph: FeatureParaGraph,
      otherNewsItems: OtherDetails,
    };

    setnewsFinal(newsTemplate);
  }, [newsPost]);

  const reArrangeArray = (arr: Array<any>) => {
    let finalatrray = arr.map((element, keyIndex) => {
      return { ...element, index: keyIndex + 1, key: keyIndex };
    });
    return finalatrray;
  };

  const arraymove = useCallback(
    (arr: Array<any>, fromIndex: number, toIndex: number) => {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      return reArrangeArray(arr);
    },
    [],
  );

  const AddItemtoJson = (itemType: string) => {
    const news = [...newsPost];
    let newsObj: any = null;
    switch (itemType) {
      case "inputHeading":
        newsObj = {
          index: 20000,
          elementType: "inputHeading",
          id: "",
          elementConfig: { placeholder: "Enter Heading" },
          headingSize: "h3",
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          headerText: "Heading",
        };

        break;
      case "image":
        newsObj = {
          index: 20000,
          elementType: "image",
          id: "",
          value: null,
          validation: {
            required: true,
            cropRequired: false,
          },
          headerText: "Select Image",
          imageCaption: "",
          imageCrop: "",
        };
        break;

      case "input":
        newsObj = {
          index: 20000,
          elementType: "input",
          id: "",
          elementConfig: {
            type: "text",
            placeholder: "Enter Content Paragraph",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          headerText: "Content Paragraph",
        };
        break;

      case "video":
        newsObj = {
          index: 20000,
          elementType: "video",
          id: "",
          elementConfig: { placeholder: "Enter Video URL" },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          headerText: "Video Link",
        };
        break;
      default:
        break;
    }
    if (newsObj !== null) {
      news.push(newsObj);

      setNewsPost(reArrangeArray(news));
    }
  };

  const InputContentHandler = useCallback(
    (newContent: string, formIdentifier: number) => {
      const news = [...newsPost];
      const newsIndex = news.findIndex((i) => {
        return i.index === formIdentifier;
      });

      newContent = newContent.replaceAll("&lt;", "<");
      newContent = newContent.replaceAll("&gt;", ">");
      console.log(newContent);
      const newsDetail = { ...news[newsIndex] };
      newsDetail.value = newContent;
      news[newsIndex] = newsDetail;
      setNewsPost(news);
    },
    [newsPost],
  );

  const ImageDataHandler = useCallback(
    (
      imageData: string,
      cropImage: string,
      caption: string,
      formIdentifier: number,
    ) => {
      // const Formelement = { ...newsPost[formIdentifier] };
      // Formelement.value = newContent;
      // setNewsPost((prevState: any) => ({ ...prevState, [formIdentifier]: Formelement }));

      const news = [...newsPost];
      const newsIndex = news.findIndex((i) => {
        return i.index === formIdentifier;
      });

      const newsDetail = { ...news[newsIndex] };
      newsDetail.value = imageData;
      newsDetail.imageCaption = caption;
      newsDetail.imageCrop = cropImage;
      news[newsIndex] = newsDetail;

      // setNewsPost((prevState: any) => ({ ...prevState, news }));

      setNewsPost(news);
    },
    [newsPost],
  );

  const onHeadingValueChanged = useCallback(
    (formIdentifier: number, headingvalue: string, headingSize: string) => {
      const news = [...newsPost];
      const newsIndex = news.findIndex((i) => {
        return i.index === formIdentifier;
      });

      const newsDetail = { ...news[newsIndex] };
      newsDetail.value = headingvalue;
      newsDetail.headingSize = headingSize;

      news[newsIndex] = newsDetail;

      // setNewsPost((prevState: any) => ({ ...prevState, news }));
      setNewsPost(news);
    },
    [newsPost],
  );

  const onHeadingChanged = useCallback(
    (formIdentifier: number, headingSize: string) => {
      const news = [...newsPost];
      const newsIndex = news.findIndex((i) => {
        return i.index === formIdentifier;
      });
      const newsDetail = { ...news[newsIndex] };

      newsDetail.headingSize = headingSize;
      news[newsIndex] = newsDetail;
      // setNewsPost((prevState: any) => ({ ...prevState, news }));
      setNewsPost(news);
    },
    [newsPost],
  );

  const OnVideoContentUpdate = useCallback(
    (formIdentifier: number, videoURL: string) => {
      const news = [...newsPost];
      const newsIndex = news.findIndex((i) => {
        return i.index === formIdentifier;
      });

      const newsDetail = { ...news[newsIndex] };
      newsDetail.value = videoURL;
      news[newsIndex] = newsDetail;

      // setNewsPost((prevState: any) => ({ ...prevState, news }));
      setNewsPost(news);
    },
    [newsPost],
  );

  const RemoveItem = useCallback(
    (formIdentifier: number) => {
      const news = [...newsPost];
      const newsRemoved = news.filter(
        (filter) => filter.index !== formIdentifier,
      );
      setNewsPost(reArrangeArray(newsRemoved));
    },
    [newsPost],
  );

  const MoveUp = useCallback(
    (formIdentifier: number) => {
      const news = [...newsPost];
      const newsIndex = news.findIndex((i) => {
        return i.index === formIdentifier;
      });

      setNewsPost(arraymove(news, newsIndex, newsIndex - 1));
    },
    [newsPost, arraymove],
  );

  const MoveDown = useCallback(
    (formIdentifier: number) => {
      const news = [...newsPost];
      const newsIndex = news.findIndex((i) => {
        return i.index === formIdentifier;
      });

      setNewsPost(arraymove(news, newsIndex, newsIndex + 1));
    },
    [newsPost, arraymove],
  );

  const resetAll = () => {
    setCategoryList((prevstate: any) =>
      prevstate.map((element: any) => {
        return { ...element, isChecked: false };
      }),
    );

    setNewsAuthorList((prevstate: any) => ({ ...prevstate, selectedVal: "" }));
    setNewsPrimaryCategoryList((prevstate: any) => ({
      ...prevstate,
      selectedVal: "",
    }));
    setNewsUpload({
      newsDate: new Date(),
      newsTime: "",
      newsSlug: "",
      newsTag: "",
      newsSynopsis: "",
    });

    setNewsPost(initialNewsPost);
    setIsClear(true);
  };
  const ResetImageHandler = () => {
    setIsClear(false);
  };

  const saveNewsHandler = () => {
    let date = newsUpload.newsDate;

    if (date === null) {
      Swal.fire("Error", "Please Enter Valid News Date", "info");
      return;
    }
    if (
      newsUpload.newsSlug === null ||
      newsUpload.newsSlug.toString().trim() === "" ||
      newsUpload.newsSlug.toString().trim() === "-"
    ) {
      Swal.fire("Error", "Please Enter news Slug", "info");
      return;
    }
    if (newsAuthorList.selectedVal.trim() === "") {
      Swal.fire("Error", "Please Select News Author", "info");
      return;
    }
    if (newsPrimaryCategoryList.selectedVal.trim() === "") {
      Swal.fire("Error", "Please Select News Primary Category", "info");
      return;
    }
    if (
      newsUpload.newsTag === null ||
      newsUpload.newsTag.toString().trim() === ""
    ) {
      Swal.fire("Error", "Please Enter news Tag", "info");
      return;
    }

    if (newsUpload.newsSynopsis.trim() === "") {
      Swal.fire("Error", "Please Select News Synopsis", "info");
      return;
    }
    if (newsFinal.FeatureHeading.FeatureHeading.trim() === "") {
      Swal.fire("Error", "Please Select News Feature Heading", "info");
      return;
    }

    let categorySelected: string = "";
    try {
      categoryList
        .filter((filter: any) => filter.isChecked === true)
        .forEach((element: any) => {
          categorySelected +=
            (categorySelected !== "" ? "," : "") + element.value;
        });
    } catch (error) {}

    let subCategorySelected: string = "";
    try {
      subcategoryList
        .filter((filter: any) => filter.isChecked === true)
        .forEach((element: any) => {
          subCategorySelected +=
            (subCategorySelected !== "" ? "," : "") + element.value;
        });
    } catch (error) {}

    let subsubCategorySelected: string = "";
    try {
      subsubcategoryList
        .filter((filter: any) => filter.isChecked === true)
        .forEach((element: any) => {
          subsubCategorySelected +=
            (subsubCategorySelected !== "" ? "," : "") + element.value;
        });
    } catch (error) {}

    let newsFinalUpload = {
      newsDetails: {
        FeatureHeading: {
          headingName: newsFinal.FeatureHeading.FeatureHeading,
          headingSize: newsFinal.FeatureHeading.headingSize,
        },
        FeatureImage: newsFinal.FeatureImage,
        FeatureImageCaption: newsFinal.FeatureImageCaption,
        FeatureImageCrop: newsFinal.FeatureImageCrop,
        otherNewsItems: newsFinal.otherNewsItems.map((element: any) => {
          let data1: any = {
            index: element.index,
            elementType: element.elementType,

            value: element.value,
          };
          if (element.elementType === "image") {
            data1 = {
              ...data1,
              imageCaption: element.imageCaption,
              imageCrop: "",
            };
          }

          if (element.elementType === "inputHeading") {
            data1 = { ...data1, headingSize: element.headingSize };
          }

          return data1;
        }),
      },

      newsDate: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      newsTime: `${date.getHours()}:${date.getMinutes()}:00`,
      newsSlug: newsUpload.newsSlug,
      newsTag: newsUpload.newsTag,
      newsSynopsis: newsUpload.newsSynopsis,
      newscategory: categorySelected,
      newsSubCategory: subCategorySelected,
      newsSubSubCategory: subsubCategorySelected,
      newsAuthor: newsAuthorList.selectedVal,
      newsprimarycategoryid: newsPrimaryCategoryList.selectedVal,
    };

    //console.log("data preparing", "data");
    try {
      axios
        .post("/CreateNews/UploadNewsDetails", newsFinalUpload)
        .then((resp: any) => {
          //console.log("Resp", resp);

          if (
            (resp.success as boolean) === true &&
            (resp.message as string) === "ok"
          ) {
            Swal.fire("Saved!", "Data saved Successfully!!!!", "success");
            resetAll();
          } else {
            Swal.fire(
              "Warning!",
              "Some Discrepencies found!!!!. Kindy Check Again",
              "warning",
            );
          }
        })
        .catch((error: any) => {
          ////console.log("error", error);
          Swal.fire(
            "Warning!",
            "Some Discrepencies found!!!!. Kindy Check Again",
            "warning",
          );
        });
    } catch (error) {
      //console.log("sdasdasd", error);
      Swal.fire(
        "Warning!",
        "Some Discrepencies found!!!!. Kindy Check Again",
        "warning",
      );
    }
  };

  const form = useMemo(() => {
    const arrLen: number = newsPost.length;
    return (
      // <form onSubmit={newsHandler}>
      <div>
        {newsPost.map((formElement: any, index: number) => {
          let componentName = null;
          switch (formElement.elementType) {
            case "inputHeading":
              componentName = (
                <InputHeader
                  headingSize={formElement.headingSize}
                  elementConfig={formElement.elementConfig}
                  headerText={formElement.headerText}
                  OnHeadingChange={(value: string, headingSize: string) => {
                    onHeadingValueChanged(
                      formElement.index,
                      value,
                      headingSize,
                    );
                  }}
                  OnHeadingSizeChange={(headingSize: string) => {
                    onHeadingChanged(formElement.index, headingSize);
                  }}
                  headintValue={formElement.value}
                />
              );
              break;
            case "image":
              componentName = (
                <ImageUploadSimple
                  onImageSelected={(
                    imageData: string,
                    cropImage: string,
                    caption: string,
                  ) => {
                    // console.log("imageData", imageData);
                    // console.log("cropImage", cropImage);
                    // console.log("caption", caption);
                    ImageDataHandler(
                      imageData,
                      cropImage,
                      caption,
                      formElement.index,
                    );
                  }}
                  captionRequired={true}
                  cropRequired={formElement.validation.cropRequired}
                  clearData={isClear}
                  clearImageResetHandler={ResetImageHandler}
                />
                // <ImageUpload
                //   onChanged={(pictureData) => {
                //     ImageDataHandler(
                //       pictureData.picturedata[0],
                //       formElement.index,
                //     );
                //   }}
                //   headerText={formElement.headerText}
                // />
              );
              break;
            case "input":
              componentName = (
                <Inputcontent
                  setContentData={(newContent: any) => {
                    InputContentHandler(
                      // newContent.target.innerHTML,
                      newContent,
                      formElement.index,
                    );
                  }}
                  content={formElement.value}
                  placeHolder="Enter Featured Content"
                  headerText={formElement.headerText}
                />
              );
              break;
            case "video":
              componentName = (
                <VideoUpload
                  elementConfig={formElement.elementConfig}
                  onVideoChange={(videoURL: string) => {
                    OnVideoContentUpdate(formElement.index, videoURL);
                  }}
                  headerText={formElement.headerText}
                  videoURL={formElement.value}
                />
              );
              break;
            default:
              break;
          }
          return (
            <div
              style={{ border: "1px solid", padding: "10px", margin: "10px" }}
              key={index}>
              <bootstrap.Row>
                <bootstrap.Col>
                  <div style={{ float: "left", width: "80%" }}>
                    <h4> {formElement.headerText}</h4>
                  </div>
                  {formElement.id === "FeatureHeading" ||
                  formElement.id === "FeatureImage" ||
                  formElement.id === "FeatureParaGraph" ? null : (
                    <div style={{ float: "right" }}>
                      <div className="dropdown no-arrow show">
                        <div
                          style={{
                            border: "1px solid gray",
                            display: "inline-block",
                            padding: "5px",
                            cursor: "pointer",
                          }}
                          className={"dropdown-toggle"}
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">
                          <img src={More} style={{ height: "15px" }} alt="" />
                        </div>

                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuLink">
                          {/* {(index + 1) !== arrLen && <span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { MoveDown(formElement.index) }}>Move Down</span>}
                                                    {index !== 0 && <span className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { MoveUp(formElement.index) }}>Move Up</span>} */}

                          {formElement.id === "FeatureHeading" ||
                          formElement.id === "FeatureImage" ||
                          formElement.id === "FeatureParaGraph"
                            ? null
                            : index + 1 !== arrLen && (
                                <span
                                  className="dropdown-item"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    MoveDown(formElement.index);
                                  }}>
                                  Move Down
                                </span>
                              )}
                          {formElement.id === "FeatureHeading" ||
                          formElement.id === "FeatureImage" ||
                          formElement.id === "FeatureParaGraph"
                            ? null
                            : index !== 0 && (
                                <span
                                  className="dropdown-item"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    MoveUp(formElement.index);
                                  }}>
                                  Move Up
                                </span>
                              )}
                          {formElement.id === "FeatureHeading" ||
                          formElement.id === "FeatureImage" ||
                          formElement.id === "FeatureParaGraph" ? null : (
                            <span
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                              onClick={() => RemoveItem(formElement.index)}>
                              Delete Component
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </bootstrap.Col>
              </bootstrap.Row>
              <hr />
              <bootstrap.Row>
                <bootstrap.Col>{componentName}</bootstrap.Col>
              </bootstrap.Row>
            </div>
          );
        })}
      </div>
      // </form>
    );
  }, [
    newsPost,
    ImageDataHandler,
    InputContentHandler,
    MoveDown,
    MoveUp,
    OnVideoContentUpdate,
    RemoveItem,
    onHeadingChanged,
    onHeadingValueChanged,
    isClear,
  ]);

  return (
    <React.Fragment>
      <bootstrap.Row>
        <bootstrap.Col>
          <bootstrap.FormGroup>
            <label>Enter News Date: </label>
            <br />
            <DatePicker
              isClearable
              placeholderText="Select News Date"
              selected={newsUpload.newsDate}
              onChange={(date: any) => {
                setNewsUpload({ ...newsUpload, newsDate: date });
              }}
              // minDate={now3.setDate(now3.getDate() - 60)}
              // maxDate={new Date()}

              strictParsing
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </bootstrap.FormGroup>
        </bootstrap.Col>
        <bootstrap.Col sm={9}>
          <bootstrap.FormGroup>
            <label>
              Enter News Slug
              <span style={{ color: "red" }}>(No Space Allowed)</span>:
            </label>
            <input
              style={{ width: "100%" }}
              type="text"
              value={newsUpload.newsSlug}
              onChange={(event) => {
                setNewsUpload({
                  ...newsUpload,
                  newsSlug: event.target.value.replace(" ", "-"),
                });
              }}></input>
          </bootstrap.FormGroup>
        </bootstrap.Col>
      </bootstrap.Row>
      <bootstrap.Row>
        <bootstrap.Col>
          <bootstrap.FormGroup>
            <label>Select News Author:</label>

            <Select
              name="author"
              onChange={(e) => {
                setNewsAuthorList({
                  ...newsAuthorList,
                  selectedVal: e.authorid,
                });

                //console.log(e.authorid);
              }}
              isSearchable={true}
              getOptionLabel={(option: any) => `${option.authorname}`}
              getOptionValue={(option: any) => `${option.authorid}`}
              value={
                newsAuthorList.selectedVal !== ""
                  ? newsAuthorList.items.filter(
                      (filter: any) =>
                        filter.authorid === newsAuthorList.selectedVal,
                    )[0]
                  : {
                      authorname: "Select Author",
                      authorid: -1,
                    }
              }
              options={newsAuthorList.items}
              isDisabled={newsAuthorList.items !== null ? false : true}
              isLoading={newsAuthorList.items !== null ? false : true}
            />
          </bootstrap.FormGroup>
        </bootstrap.Col>
      </bootstrap.Row>

      <bootstrap.Row>
        <bootstrap.Col>
          <bootstrap.FormGroup>
            <label>Select News Primary Category:</label>

            <Select
              name="author"
              onChange={(e) => {
                setNewsPrimaryCategoryList({
                  ...newsPrimaryCategoryList,
                  selectedVal: e.value,
                });

                //console.log(e.value);
              }}
              isSearchable={true}
              getOptionLabel={(option: any) => `${option.text}`}
              getOptionValue={(option: any) => `${option.value}`}
              value={
                newsPrimaryCategoryList.selectedVal !== ""
                  ? newsPrimaryCategoryList.items.filter(
                      (filter: any) =>
                        filter.value === newsPrimaryCategoryList.selectedVal,
                    )[0]
                  : {
                      text: "Select Primary Category",
                      value: -1,
                    }
              }
              options={newsPrimaryCategoryList.items}
              isDisabled={newsPrimaryCategoryList.items !== null ? false : true}
              isLoading={newsPrimaryCategoryList.items !== null ? false : true}
            />
          </bootstrap.FormGroup>
        </bootstrap.Col>
      </bootstrap.Row>

      <bootstrap.Row>
        <bootstrap.Col>
          <bootstrap.FormGroup>
            <label>
              Enter News Tags{" "}
              <span style={{ color: "red" }}>(Separaed by Comma ",")</span>:
            </label>
            <textarea
              style={{ width: "100%" }}
              value={newsUpload.newsTag}
              onChange={(event) => {
                setNewsUpload({ ...newsUpload, newsTag: event.target.value });
              }}></textarea>
          </bootstrap.FormGroup>
        </bootstrap.Col>
      </bootstrap.Row>
      <bootstrap.Row>
        <bootstrap.Col>
          <bootstrap.FormGroup>
            <label>Enter News Synopsis:</label>
            <textarea
              style={{ width: "100%" }}
              value={newsUpload.newsSynopsis}
              onChange={(event) => {
                setNewsUpload({
                  ...newsUpload,
                  newsSynopsis: event.target.value,
                });
              }}></textarea>
          </bootstrap.FormGroup>
        </bootstrap.Col>
      </bootstrap.Row>
      {form}
      <bootstrap.Row>
        <bootstrap.Col sm={4}>
          <bootstrap.FormGroup>
            <bootstrap.Card>
              <bootstrap.Card.Header>Categories List</bootstrap.Card.Header>
              <bootstrap.Card.Body
                style={{ height: "300px", overflowY: "scroll" }}>
                <CheckBoxList
                  checkBoxItems={categoryList}
                  handleChecked={CategoryListCheckedHandler}
                />
              </bootstrap.Card.Body>
            </bootstrap.Card>
          </bootstrap.FormGroup>
        </bootstrap.Col>
        <bootstrap.Col sm={4}>
          <bootstrap.FormGroup>
            <bootstrap.Card>
              <bootstrap.Card.Header>Sub Categories List</bootstrap.Card.Header>
              <bootstrap.Card.Body
                style={{ height: "300px", overflowY: "scroll" }}>
                <CheckBoxList
                  checkBoxItems={subcategoryList}
                  handleChecked={SubCategoryListCheckedHandler}
                />
              </bootstrap.Card.Body>
            </bootstrap.Card>
          </bootstrap.FormGroup>
        </bootstrap.Col>
        <bootstrap.Col sm={4}>
          <bootstrap.FormGroup>
            <bootstrap.Card>
              <bootstrap.Card.Header>
                Sub Sub Categories List
              </bootstrap.Card.Header>
              <bootstrap.Card.Body
                style={{ height: "300px", overflowY: "scroll" }}>
                <CheckBoxList
                  checkBoxItems={subsubcategoryList}
                  handleChecked={SubSubCategoryListCheckedHandler}
                />
              </bootstrap.Card.Body>
            </bootstrap.Card>
          </bootstrap.FormGroup>
        </bootstrap.Col>
      </bootstrap.Row>
      <NewsPreview newsFinal={newsFinal} />

      <div
        style={{
          position: "fixed",
          bottom: "2px",
          zIndex: 999,
          backgroundColor: "white",
          width: "90%",
        }}>
        <bootstrap.Row className="mt-2 mb-2">
          <bootstrap.Col className="text-center">
            <bootstrap.Button
              variant="success"
              onClick={() => saveNewsHandler()}>
              Save News
            </bootstrap.Button>
            <bootstrap.Button
              variant="danger"
              onClick={() => {
                resetAll();
              }}
              className="ml-2">
              Reset All
            </bootstrap.Button>
          </bootstrap.Col>
        </bootstrap.Row>
      </div>
      <div
        className="m-1"
        style={{
          position: "fixed",
          bottom: "10px",
          right: "20px",
          zIndex: 9999,
        }}>
        <div className="dropdown no-arrow show">
          <div
            style={{
              display: "inline-block",
              padding: "5px",
              cursor: "pointer",
            }}
            className={"dropdown-toggle"}
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <img src={Add} style={{ height: "45px" }} alt="" />
          </div>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <span
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => AddItemtoJson("inputHeading")}>
              Add Header
            </span>
            <span
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => AddItemtoJson("image")}>
              Add Image
            </span>
            <span
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => AddItemtoJson("input")}>
              Add Paragraph
            </span>
            <span
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => AddItemtoJson("video")}>
              Add Video
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateNews;
