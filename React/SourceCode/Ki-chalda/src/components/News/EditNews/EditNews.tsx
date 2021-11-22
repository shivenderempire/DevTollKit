import { useEffect, useReducer, useState } from "react";
import EditNewsSearch from "./EditNewsSearch";
import EditNewsList from "./EditNewsList";
import axios from "../../../serviceCall/axiosEdusoftClean";
import { IEditNewsSearchParams } from "./IEditNewsSearchParams";
import Swal from "sweetalert2";

const filteredReducer = (filteredData: any, action: any) => {
  switch (action.type) {
    case "SET":
      return action.filteredData;
    case "DELETE":
      return filteredData.filter(
        (filter: any) => filter.newsid !== action.newsid,
      );

    default:
      return null;
  }
};
const EditNews = () => {
  const [filteredData, dispatchfilteredData] = useReducer(
    filteredReducer,
    null,
  );

  const [categoryList, setCategoryList] = useState<any>(null);
  const [subcategoryList, setSubCategoryList] = useState<any>(null);
  const [subsubcategoryList, setSubsubCategoryList] = useState<any>(null);
  // const [filterData, setFilterData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("/CreateNews/NewsCategoryList")
      .then((resp: any) => {
        if (
          (resp.success as boolean) === true &&
          (resp.message as string) === "ok"
        ) {
          setCategoryList(resp.data);
        }
      })
      .catch((err: any) => {});
  }, []);
  const CategoryChanged = (categoryIds: string) => {
    if (categoryIds.trim() !== "") {
      axios
        .get(`CreateNews/NewsSubCategoryList?categoryIds=${categoryIds}`)
        .then((resp: any) => {
          if (
            (resp.success as boolean) === true &&
            (resp.message as string) === "ok"
          ) {
            setSubCategoryList(resp.data);
          }
        })
        .catch((err: any) => {});
    } else {
      setSubCategoryList(null);
    }
  };
  const SubCategoryChanged = (subcategoryIds: string) => {
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
  const SearchParametersHandler = (searchParams: IEditNewsSearchParams) => {
    let paramdata = {
      catid: searchParams.category,
      subcatid: searchParams.subcategory,
      subsubcatid: searchParams.subsubcategory,
      keyword: searchParams.keyword,
      datefrom:
        searchParams.datefrom !== undefined && searchParams.datefrom
          ? `${searchParams.datefrom.getFullYear()}-${
              searchParams.datefrom.getMonth() + 1
            }-${searchParams.datefrom.getDate()}`
          : null,
      dateto:
        searchParams.dateto !== undefined && searchParams.dateto
          ? `${searchParams.dateto.getFullYear()}-${
              searchParams.dateto.getMonth() + 1
            }-${searchParams.dateto.getDate()}`
          : null,
    };
    console.log("Search Params are ", paramdata);
    axios.post("CreateNews/NewsSearchList", paramdata).then((resp: any) => {
      let data = resp.data;
      console.log(resp);
      if (resp.statusCode === 200 && resp.data !== null) {
        dispatchfilteredData({ type: "SET", filteredData: data });
        // setFilterData(data);
      } else {
        Swal.fire("error", resp.message, "error");
      }
    });
  };

  const NewsDeleteHandler = (newsId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to Delete News",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, Cancel it",
      confirmButtonColor: "#ec4561",
    }).then((result) => {
      if (result.value) {
        axios
          .get(`CreateNews/deletenews?newsid=${newsId}`)
          .then((response: any) => {
            const msg = response.data;
            if (response.statusCode === 200 && response.data === "deleted") {
              Swal.fire("Deleted!", "News deleted Successfully!!!!", "success");
              dispatchfilteredData({ type: "DELETE", newsid: newsId });
            } else {
              Swal.fire("Warning!", msg, "warning");
            }
          })
          .catch((err) => {
            console.log("Delete Error", err);
            Swal.fire(
              "Warning!",
              "Some Error Occurred!! Please Try Again",
              "warning",
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  return (
    <div>
      <EditNewsSearch
        categoryList={categoryList}
        OnCategoryChanged={CategoryChanged}
        subcategoryList={subcategoryList}
        OnSubCategoryChanged={SubCategoryChanged}
        subsubcategoryList={subsubcategoryList}
        onSearchParameters={SearchParametersHandler}
        OnResetSearch={() => {
          dispatchfilteredData({ type: "SET", filteredData: null });
        }}
      />
      <EditNewsList
        filterData={filteredData}
        OnNewsDeleteHandler={NewsDeleteHandler}
      />
    </div>
  );
};

export default EditNews;
