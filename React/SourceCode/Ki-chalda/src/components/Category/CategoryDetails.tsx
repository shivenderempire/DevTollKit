import React, { useState, useEffect } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const CategoryDetails = (props: any) => {
  const tableHead = { backgroundColor: "lightgray" };
  const [searchtext, setsearchtext] = useState("");
  const [rowsData, setrowsData] = useState<any[]>();

  useEffect(() => {
    setrowsData(props.categoryList);
  }, [props]);

  const FilterData = (searchtext1: string) => {
    let filteredData: any[] = [];
    let data: any[] | undefined = [...(rowsData as any[])];

    if (data && data.length > 0 && searchtext1 !== "") {
      filteredData = data.filter((filter: any) =>
        filter.categoryname
          .toString()
          .toLowerCase()
          .includes(searchtext1.toLowerCase()),
      );

      setrowsData(filteredData);
    } else {
      setrowsData(props.categoryList);
    }
  };

  return (
    <div
      className="mt-2 table-responsive"
      style={{ overflowY: "auto", maxHeight: "600px" }}>
      {props.categoryList === null && <b>Please Wait.......</b>}

      {props.categoryList && props.categoryList.length > 0 && (
        <table className="table table-sm  table-hover table-bordered">
          <thead style={tableHead}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                <input
                  type="text"
                  placeholder="Enter Search Text"
                  className="form-control"
                  value={searchtext}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    FilterData(event.target.value);
                    setsearchtext(event.target.value);
                  }}
                />
              </td>
            </tr>
            {rowsData && rowsData.length === 0 ? (
              <b>No Record Found </b>
            ) : (
              rowsData &&
              rowsData.length > 0 &&
              rowsData.map((element: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.categoryname}</td>
                    <td>
                      <ButtonGroup>
                        <DropdownButton
                          as={ButtonGroup}
                          title="Action"
                          id="bg-nested-dropdown"
                          className="danger">
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() =>
                              props.RequestAction(
                                element.categoryid as number,
                                element.categoryname,
                                "edit",
                              )
                            }>
                            Edit Category
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="2"
                            onClick={() =>
                              props.RequestAction(
                                element.categoryid as number,
                                element.categoryname,
                                "remove",
                              )
                            }
                            className="danger">
                            Remove Category
                          </Dropdown.Item>
                        </DropdownButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default CategoryDetails;
