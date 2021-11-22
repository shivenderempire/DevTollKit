import React, { useState, useEffect } from "react";
import AuthorEntry from "./AuthorEntry";
import AuthorDetails from "./AuthorDetails";
import axios from "../../serviceCall/axiosEdusoftClean";
import swal from "sweetalert2";

const authorInit = {
  authorId: 0,
  authorName: "",
};
const CreateAuthor = () => {
  const [authorDetails, setAuthorDetails] = useState(authorInit);
  const [authorList, setAuthorList] = useState(null);

  useEffect(() => {
    getAuhtorList(setAuthorList);
  }, []);
  const onInputValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthorDetails((prevProps) => ({ ...prevProps, [name]: value }));
  };
  const onSaveAuthor = () => {
    const authDet = { ...authorDetails };
    axios
      .post("AuthorMaster/saveAuthor", {
        authorName: authDet.authorName,
        authorId: authDet.authorId,
      })
      .then((resp: any) => {
        if (
          (resp.success as boolean) === true &&
          (resp.message as string) === "ok"
        ) {
          swal.fire(
            "saved",
            "Author " +
              (authDet.authorId === 0 ? "Saved" : "Updated") +
              " Successfully",
            "success",
          );
          getAuhtorList(setAuthorList);
          onResetAuthor();
        } else {
          swal.fire(
            "oops",
            "Some error Ocurred during saving author details",
            "error",
          );
        }
      })
      .catch((err: any) => {
        swal.fire(
          "oops",
          "Some error Ocurred during saving author details",
          "error",
        );
      });
  };
  const onResetAuthor = () => {
    setAuthorDetails(authorInit);
  };
  const OnRequestAction = (
    authorId: number,
    authorName: string,
    action: string,
  ) => {
    console.log(action);
    console.log(authorId);

    if (action === "edit") {
      setAuthorDetails((prevprops: any) => ({
        ...prevprops,
        authorId: authorId,
        authorName: authorName,
      }));
    } else if (action === "remove") {
      axios
        .post("AuthorMaster/removeAuthor", {
          authorId: authorId,
        })
        .then((resp: any) => {
          if (
            (resp.success as boolean) === true &&
            (resp.message as string) === "ok" &&
            (resp.data as string) === "Removed"
          ) {
            swal.fire("saved", "Author  removed Successfully", "success");
            getAuhtorList(setAuthorList);
          } else {
            swal.fire(
              "oops",
              "Some error Ocurred during removing author details",
              "error",
            );
          }
        })
        .catch((err: any) => {
          swal.fire(
            "oops",
            "Some error Ocurred during removing author details",
            "error",
          );
        });
    }
  };
  return (
    <div>
      <AuthorEntry
        authorDetails={authorDetails}
        onInputValueChanged={onInputValueChanged}
        onResetAuthor={onResetAuthor}
        onSaveAuthor={onSaveAuthor}
      />
      <AuthorDetails authorList={authorList} RequestAction={OnRequestAction} />
    </div>
  );
};
export default CreateAuthor;
function getAuhtorList(
  setAuthorList: React.Dispatch<React.SetStateAction<null>>,
) {
  axios
    .get("AuthorMaster/getAuthorEntryList")
    .then((resp: any) => {
      if (
        (resp.success as boolean) === true &&
        (resp.message as string) === "ok"
      ) {
        setAuthorList(resp.data);
        console.log(resp.data);
      } else {
        swal.fire("oops", "Some error Ocurred during data fetching", "error");
      }
    })
    .catch((err: any) => {
      swal.fire("oops", "Some error Ocurred during data fetching", "error");
    });
}
