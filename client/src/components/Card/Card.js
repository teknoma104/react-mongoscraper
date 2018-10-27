import React from "react";
import "./Card.css";

const Card = props => (
    <div
        className="card flex-row flex-wrap mh-articles"
        data-id={props._id}
        id={`mh-thread-${props._id}`}
    >
        <div className="card-header border-0 p-0">
            <img className="my-auto" src={props.preview} style={{ height: "52px" }} />
        </div>

        <div className="card-body px-1">
            <h5 className="card-title">
                {props.title}
            </h5>
            <a href={props.link} target="_blank">
                {props.link}
            </a>
            <div className="w-100"></div>
            <div className="card-footer">
                <button
                    type="button"
                    className="btn btn-dark addNote"
                    data-toggle="modal"
                    data-target={`#noteModal${props._id}`}
                    data-id={props._id}
                >
                    Add a Comment
                </button>
                <button
                    type="button"
                    className="btn btn-danger removeArticle"
                    data-id={props._id}
                >
                    Remove Saved Thread
                </button>
            </div>

        </div>
    </div>
);

export default Card;
