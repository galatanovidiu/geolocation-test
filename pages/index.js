import React from "react";
import {useGeolocated} from "react-geolocated";
import Webcam from "react-webcam";

export default function Home() {
    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const WebcamCapture = () => {
        const webcamRef = React.useRef(null);
        const capture = React.useCallback(
            () => {
                const imageSrc = webcamRef.current.getScreenshot();
            },
            [webcamRef]
        );
    }

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
                <tr>
                    <td>altitude</td>
                    <td>{coords.altitude}</td>
                </tr>
                <tr>
                    <td>heading</td>
                    <td>{coords.heading}</td>
                </tr>
                <tr>
                    <td>speed</td>
                    <td>{coords.speed}</td>
                </tr>
                </tbody>
            </table>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </div>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
}
