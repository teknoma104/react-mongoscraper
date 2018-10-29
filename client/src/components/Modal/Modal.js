import React from "react";

const Modal = (props) => (
    <div
        className="modal fade modalNote"
        tabindex="-1"
        role="dialog"
        id={`noteModal${props._id}`}
        aria-labelledby="noteModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog" role="document">
            <div class="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="noteModalLabel">Comment Section - {props.title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {{#each this.notes}}
                    <div className="card">
                        <div className="card-body">
                            <p className="otherNotes"> {props.body}</p>
                            <button type="button" class="btn btn-danger deleteComment" data-id={props._id}
                                data-article-id={props.article}>X</button>
                        </div>
                    </div>
                    {{/ each}}
                <form>
                        <div className="form-group">
                            <label for="message-text" class="col-form-label">Comment:</label>
                            <textarea className="form-control" id={`noteText${props._id}`} placeholder="Type your comment here"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary saveComment" data-id={props._id}>Save Comment</button>
                </div>
            </div>
        </div>
    </div>
);

export default Modal;
