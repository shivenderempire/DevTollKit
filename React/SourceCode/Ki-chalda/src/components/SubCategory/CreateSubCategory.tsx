import React, { useState, useEffect } from "react";
import SubCategoryEntry from "./SubCategoryEntry";
import SubCategoryDetails from "./SubCategoryDetails";
import axios from "../../serviceCall/axiosEdusoftClean";
import swal from "sweetalert2";

const subcategoryInit = {
  category: "0",
  subcategoryId: 0,
  subcategoryName: "",
};

const CreateSubCategory = () => {
  const [subcategoryDetails, setSubcategoryDetails] = useState(subcategoryInit);
  const [categoryList, setcategoryList] = useState(null);
  const [subcategoryList, setSubcategoryList] = useState(null);

  useEffect(() => {
    getSubCategoryList(setSubcategoryList);
    getCategoryList(setcategoryList);
  }, []);

  const onInputValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubcategoryDetails((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const onSaveSubCategory = () => {
    const catDet = { ...subcategoryDetails };
    console.log(catDet);
    axios
      .post("SubCategory/subsavecategory", {
        subcategoryname: catDet.subcategoryName,
        subcategoryid: catDet.subcategoryId,
        categoryid: (catDet.category as unknown) as Number,
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
              (catDet.subcategoryId === 0 ? "Saved" : "Updated") +
              " Successfully",
            "success",
          );
          getSubCategoryList(setSubcategoryList);
          onResetSubCategory();
        } else {
          swal.fire(
            "oops",
            "Some error Ocurred during saving category details",
            "error",
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
        swal.fire(
          "oops",
          "Some error Ocurred during saving category details",
          "error",
        );
      });
  };
  const onResetSubCategory = () => {
    setSubcategoryDetails(subcategoryInit);
  };
  const OnRequestAction = (
    subcategoryId: number,
    subcategoryName: string,
    categoryid: number,
    action: string,
  ) => {
    console.log(action);
    console.log(categoryid);
    if (action === "edit") {
      setSubcategoryDetails((prevprops: any) => ({
        ...prevprops,
        category: categoryid,
        subcategoryName: subcategoryName,
        subcategoryId: subcategoryId,
      }));
    } else if (action === "remove") {
      axios
        .post("SubCategory/removesubcategory", {
          subcategoryid: subcategoryId,
        })
        .then((resp: any) => {
          if (
            (resp.success as boolean) === true &&
            (resp.message as string) === "ok" &&
            (resp.data as string) === "Removed"
          ) {
            swal.fire("saved", "Category  removed Successfully", "success");
            getSubCategoryList(setSubcategoryList);
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
  const DropDownChanged = (value: string, name: string) => {
    setSubcategoryDetails((prevstate: any) => ({
      ...prevstate,
      [name]: value,
    }));
  };
  return (
    <div>
      <SubCategoryEntry
        subcategoryDetails={subcategoryDetails}
        onInputValueChanged={onInputValueChanged}
        onResetSubCategory={onResetSubCategory}
        onSaveSubCategory={onSaveSubCategory}
        categoryList={categoryList}
        onDropDownChanged={DropDownChanged}
      />
      <SubCategoryDetails
        subcategoryList={subcategoryList}
        RequestAction={OnRequestAction}
      />
    </div>
  );
};

export default CreateSubCategory;
function getSubCategoryList(
  setSubcategoryList: React.Dispatch<React.SetStateAction<null>>,
) {
  axios
    .get("SubCategory/subcategorylist")
    .then((resp: any) => {
      if (
        (resp.success as boolean) === true &&
        (resp.message as string) === "ok"
      ) {
        setSubcategoryList(resp.data);
        console.log(resp.data);
      } else {
        swal.fire("oops", "Some error Ocurred during data fetching", "error");
      }
    })
    .catch((err: any) => {
      swal.fire("oops", "Some error Ocurred during data fetching", "error");
    });
}

function getCategoryList(
  setcategoryList: React.Dispatch<React.SetStateAction<null>>,
) {
  axios
    .get("category/categorylistfordropdown")
    .then((resp: any) => {
      if (
        (resp.success as boolean) === true &&
        (resp.message as string) === "ok"
      ) {
        setcategoryList(resp.data);
        console.log("catlist", resp.data);
      } else {
        swal.fire("oops", "Some error Ocurred during data fetching", "error");
      }
    })
    .catch((err: any) => {
      swal.fire("oops", "Some error Ocurred during data fetching", "error");
    });
}
