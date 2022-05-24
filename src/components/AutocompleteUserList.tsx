import firebase from "../firebase/clientApp";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { collection, getFirestore, onSnapshot, doc } from "firebase/firestore";
import { User } from "../types/User";
import UserCard from "./UserCard";

import "./AutocompleteUserList.css";

const db = getFirestore(firebase);

type AutoCompleteProps = {
  users: Array<User>;
  setUsers: any;
};

const AutoCompleteUserList = ({ users, setUsers }: AutoCompleteProps) => {
  const authUser = (useContext(AuthContext) as any).user;
  const usersRef = collection(db, "users");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<User>>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [usersLocal, setUsersLocal] = useState<Array<User>>([]);

  useEffect(() => {
    onSnapshot(usersRef, (snapshot) => {
      const result = snapshot.docs
        .filter((doc) => doc.id !== authUser.uid)
        .map((doc) => {
          return {
            uid: doc.id,
            username: doc.data().username,
            email: doc.data().email,
            imageUrl: doc.data().imageUrl,
            role: "user",
          };
        });
      setUsersLocal(result);
    });
  }, [authUser]);

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = usersLocal.filter(
      (suggestion) =>
        suggestion.username.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = ( user: User ) => {
    setFilteredSuggestions([]);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
    setInput("");
    if (!users.includes(user)) {
      setUsers(users.concat(user));
    }
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }

          return (
            <li className={className} key={suggestion.uid} onClick={() => onClick(suggestion) }>
              <UserCard user={suggestion} isAdmin={false} />
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <span role="img" aria-label="tear emoji">
        </span>{" "}
        <em>sorry no suggestions</em>
      </div>
    );
  };

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
        className="appearance-none rounded-none relative block w-half px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Search a user"
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};

export default AutoCompleteUserList;
