import React from "react";
import "./ScrapeCard.css";

const Card = props => (
    <div
        className="card flex-row flex-wrap mh-articles"
        data-id={props._id}
        id={`mh-thread-${props._id}`}
    >
        <div className="card-header border-0 p-0">
            <img className="my-auto" src={props.preview} style={{ height: "52px" }} alt="" />
        </div>
        <div className="card-body px-2">
            <h5 className="card-title">
                {props.title}
            </h5>
            <a href={props.link} target="_blank">
                Link To MH Sub-Reddit Thread or Related Thread Link
            </a>
        </div>
        <div className="w-100"></div>
        <div className="card-footer text-right">
            <button
                type="button"
                className="btn btn-dark save"
                data-id={props._id}
                onClick={() => props.saveThisArticle(props._id)}>
                Save Article
            </button>
        </div>
    </div>
);

export default Card;
