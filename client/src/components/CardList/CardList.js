import React from "react";

export const CardList = ({ children }) => {
    return (
        <div className="cardlist-overflow-container">
            <ul className="list-group">
                {children}
            </ul>
        </div>
    )
};