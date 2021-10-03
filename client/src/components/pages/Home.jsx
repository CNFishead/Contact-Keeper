import React, { useContext, useEffect } from "react";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/AuthContext";

const Home = ({ history }) => {
  const { isAuthenticated, loadUser } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      loadUser();
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
