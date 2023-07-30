import React, { useRef, useState, useEffect } from 'react'
import { uploadImage, getProfiles } from '../../actions/profile'
import { connect, useSelector } from 'react-redux'
import './ImageUpload.css'

const ImageUpload = ({
    uploadImage,
    getProfileByID,
    getProfiles,
    imageId,
    center
}) => {
    const { profile } = useSelector((state) => state.rootReducer.profile)
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)
    const filePickerRef = useRef()
    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const pickedHandler = (event) => {
        let pickedFile
        let fileIsValid = isValid
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
            fileIsValid = false
        }
        fileIsValid && uploadImage(pickedFile) && updateProfiles()
        // props.onInput(props.imageId, pickedFile, fileIsValid)
    }

    const updateProfiles = () => {
        getProfiles()
    }
    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    return (
        <div className="form-control">
            <img src={profile.user?.avatar} alt="" className="round-img" />
            <input
                id={imageId}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </button>
            </div>
            {!isValid && <p>error</p>}
        </div>
    )
}

export default connect(null, { uploadImage, getProfiles })(ImageUpload)
