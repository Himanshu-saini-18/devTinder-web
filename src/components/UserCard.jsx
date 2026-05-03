import React from "react";

const UserCard = ({ user }) => {
  if (!user)return null
  const { firstName, lastName, photoUrl, about, age, gender } = user;
  return (
    <>
    
      <div className="card bg-base-300 w-80 h-170 shadow-sm  mx-10">
        <figure>
          <img className="w-50" src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " , " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-soft btn-error">Ignore</button>
            <button className="btn btn-soft btn-success">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
