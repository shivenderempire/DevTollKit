import React, { useMemo } from "react";
import * as bootstrap from "react-bootstrap";
import ReactPlayer from "react-player";
import parse from "html-react-parser";

const NewsPreview = React.memo((props: any) => {
  const { newsFinal } = props;
  const preview = useMemo(() => {
    let Headings = (
      <div>
        {newsFinal && newsFinal.FeatureHeading && (
          <newsFinal.FeatureHeading.headingSize>
            {newsFinal.FeatureHeading.FeatureHeading}
          </newsFinal.FeatureHeading.headingSize>
        )}
        {newsFinal && newsFinal.FeatureImage && (
          <img src={newsFinal.FeatureImage} alt="" />
        )}
        {newsFinal && newsFinal.FeatureParaGraph && (
          <div className="mt-3">{parse(newsFinal.FeatureParaGraph)}</div>
        )}
      </div>
    );

    const othercontent =
      newsFinal &&
      newsFinal.otherNewsItems &&
      newsFinal.otherNewsItems.map((element: any, index: number) => {
        let componentName = null;
        switch (element.elementType) {
          case "inputHeading":
            componentName = (
              <element.headingSize>{element.value}</element.headingSize>
            );
            break;
          case "image":
            componentName = <img src={element.value} alt="" />;
            break;
          case "input": {
            // componentName = parse(element.value);
            componentName = (
              <div
                dangerouslySetInnerHTML={{
                  __html: `
               ${element.value}
            `,
                }}
              />
            );
            break;
          }
          case "video":
            componentName = <ReactPlayer url={element.value} controls />;
            break;

          default:
            break;
        }

        return (
          <div className="mt-3" key={index}>
            {componentName}
          </div>
        );
      });
    return (
      <div style={{ color: "black" }}>
        {Headings} {othercontent}
      </div>
    );
  }, [newsFinal]);
  return (
    <React.Fragment>
      {newsFinal && (
        <bootstrap.Accordion>
          <bootstrap.Card>
            <bootstrap.Card.Header>
              <bootstrap.Accordion.Toggle
                as={bootstrap.Button}
                variant="link"
                eventKey="0">
                News Preview
              </bootstrap.Accordion.Toggle>
            </bootstrap.Card.Header>
            <bootstrap.Accordion.Collapse eventKey="0">
              <bootstrap.Card.Body>{preview}</bootstrap.Card.Body>
            </bootstrap.Accordion.Collapse>
          </bootstrap.Card>
        </bootstrap.Accordion>
      )}
    </React.Fragment>
  );
});

export default NewsPreview;
