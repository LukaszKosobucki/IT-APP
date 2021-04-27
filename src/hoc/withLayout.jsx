import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const withLayout = (Component) => {
  const WithLayout = (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
  return withRouter(WithLayout);
};

export default withLayout;
