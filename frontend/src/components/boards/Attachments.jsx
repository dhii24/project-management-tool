import { useState } from "react";
import attachmentService from "../../services/attachmentService";

function Attachments({ cardId }){
    const [selectedFile, setSelectedFile] = useState(null);

    const [attachments, setAttachments] = useState([]);

    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if(!file)
            return;

        setError("");

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "application/pdf"
        ];

        if(!allowedTypes.includes(file.type)){
            setError("Only PNG, JPEG and PDF files are allowed.");
            setSelectedFile(null);
            return;
        }

        if(file.size > 5 * 1024 * 1024){
            setError("File size must be less than 5 MB.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if(!selectedFile)
            return;

        try{
            setUploading(true);
            setError("");

            const attachment = await attachmentService.uploadAttachment(cardId, selectedFile);

            setAttachments((previousAttachments) => [
                ...previousAttachments,
                attachment
            ]);

            setSelectedFile(null);
            document.getElementById("attachment-input").value = "";
        }

        catch(error){
            console.error("Failed to upload attachment:", error);

            setError(
                error.response?.data?.message || "Failed to upload attachment."
            )
        }

        finally{
            setUploading(false);
        }
    };

    return (
        <div className="attachments-section">
            <div className="attachments-header">
                <h3>Attachments</h3>
                <span>{attachments.length}</span>
            </div>

            <div className="attachment-upload">
                <input id="attachment-input" type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange}/>

                {selectedFile && (
                    <div className="selected-file">
                        <span>{selectedFile.name}</span>
                        <span>{ (selectedFile.size /(1024 * 1024)).toFixed(2) } MB </span>
                    </div>
                )}

                <button type="button" className="primary-button" onClick={handleUpload} disabled={!selectedFile || uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>

            {error && (
                <p className="error-message">{error}</p>
            )}

            {attachments.length > 0 && (
                <div className="attachments-list">
                    {attachments.map((attachment) => (
                        <div key={attachment._id} className="attachment-item">
                            <div className="attachment-info">
                                <strong>{attachment.originalName}</strong>
                                <span>
                                    { (attachment.size /(1024 * 1024)).toFixed(2) } MB
                                </span>
                            </div>

                            <span className="attachment-type">
                                {attachment.mimeType === "application/pdf" ? "PDF": "Image"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Attachments;