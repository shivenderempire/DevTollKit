import React, { useState, useEffect } from "react";
import CategoryEntry from "./CategoryEntry";
import CategoryDetails from "./CategoryDetails";
import axios from "../../serviceCall/axiosEdusoftClean";
import swal from "sweetalert2";

const categoryInit = {
  categoryId: 0,
  categoryName: "",
};

const CreateCategory = () => {
  const [categoryDetails, setCategoryDetails] = useState(categoryInit);
  const [categoryList, setCategoryList] = useState(null);

  useEffect(() => {
    getCategoryList(setCategoryList);
  }, []);
  const onInputValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryDetails((prevProps) => ({ ...prevProps, [name]: value }));
  };
  const onSaveCategory = () => {
    const catDet = { ...categoryDetails };
    axios
      .post("Category/savecategory", {
        categoryname: catDet.categoryName,
        categoryid: catDet.categoryId,
      })
      .then((resp: any) => {
        console.log(resp);
        if (
          (resp.success as boolean) === true &&
          (resp.message as string) === "ok"
        ) {
          swal.fire(
            "saved",
            "Category " +
              (catDet.categoryId === 0 ? "Saved" : "Updated") +
              " Successfully",
            "success",
          );
          getCategoryList(setCategoryList);
          onResetCategory();
        } else {
          swal.fire(
            "oops",
            "Some error Ocurred during saving category details",
            "error",
          );
        }
      })
      .catch((err: any) => {
        swal.fire(
          "oops",
          "Some error Ocurred during saving category details",
          "error",
        );
      });
  };
  const onResetCategory = () => {
    setCategoryDetails(categoryInit);
  };
  const OnRequestAction = (
    categoryId: number,
    categoryName: string,
    action: string,
  ) => {
    console.log(action);
    console.log(categoryId);

    if (action === "edit") {
      setCategoryDetails((prevprops: any) => ({
        ...prevprops,
        categoryId: categoryId,
        categoryName: categoryName,
      }));
    } else if (action === "remove") {
      axios
        .post("Category/removecategory", {
          categoryid: categoryId,
        })
        .then((resp: any) => {
          if (
            (resp.success as boolean) === true &&
            (resp.message as string) === "ok" &&
            (resp.data as string) === "Removed"
          ) {
            swal.fire("saved", "Category  removed Successfully", "success");
            getCategoryList(setCategoryList);
          } else {
            swal.fire(
              "oops",
              "Some error Ocurred during removing category details",
              "error",
            );
          }
        })
        .catch((err: any) => {
          swal.fire(
            "oops",
            "Some error Ocurred during removing category details",
            "error",
          );
        });
    }
  };
  return (
    <div>
      <CategoryEntry
        categoryDetails={categoryDetails}
        onInputValueChanged={onInputValueChanged}
        onResetCategory={onResetCategory}
        onSaveCategory={onSaveCategory}
      />
      <CategoryDetails
        categoryList={categoryList}
        RequestAction={OnRequestAction}
      />
    </div>
  );
};
export default CreateCategory;
function getCategoryList(
  setCategoryList: React.Dispatch<React.SetStateAction<null>>,
) {
  axios
    .get("Category/categorylist")
    .then((resp: any) => {
      if (
        (resp.success as boolean) === true &&
        (resp.message as string) === "ok"
      ) {
        setCategoryList(resp.data);
        console.log(resp.data);
      } else {
        swal.fire("oops", "Some error Ocurred during data fetching", "error");
      }
    })
    .catch((err: any) => {
      swal.fire("oops", "Some error Ocurred during data fetching", "error");
    });
}
