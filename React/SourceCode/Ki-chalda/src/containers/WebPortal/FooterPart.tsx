import React from "react";

// sbadmin
export default function FooterPart() {
  return (
    <React.Fragment>
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            {"Copyright © "}
            <span> Ki chalda {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
