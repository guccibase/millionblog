import React from "react";
import { Image } from "react-bootstrap";
import "./common.css";

export default function ArticleCoverImg({ imageAsUrl, handleImage }) {
    return (
        <div>
            {handleImage && (
                <>
                    <h4>Cover image</h4>
                    <input
                        className="mt-2 mb-4"
                        type="file"
                        onChange={handleImage}
                    />
                </>
            )}
            {imageAsUrl && (
                <div className="text-center">
                    <Image
                        className="cover-image  mt-2 mb-5"
                        src={imageAsUrl}
                        alt="cover image"
                    />
                </div>
            )}
        </div>
    );
}
