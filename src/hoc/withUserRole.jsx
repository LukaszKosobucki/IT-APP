import React from "react";
import { connect } from "react-redux";

const withUserRole = (Component, mappings, props) => {
  const type = props.userData.type;
  return (
    <Component
      innerComponents={mappings[type].innerComponents}
      roleProps={mappings[type].roleProps}
      props={props}
    />
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps)(withUserRole);
