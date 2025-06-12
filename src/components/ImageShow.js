import axios from 'axios';

function ImageShow({ image }) {
  const handleDownload = async () => {
    try {
      // Trigger the download location endpoint
      await axios.get(image.links.download_location, {
        headers: {
          Authorization: 'Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y',
        },
      });
    } catch (error) {
      console.error('Error triggering download location:', error);
      // Optionally, inform the user that the tracking ping failed but download will still proceed
    }

    // Proceed with download
    try {
      const link = document.createElement('a');
      link.href = image.urls.full; // Or image.links.download
      link.download = `${image.alt_description || image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error initiating download:', error);
      // Optionally, inform the user that download failed
    }
  };

  return (
    <div>
      <img src={image.urls.small} alt={image.alt_description} />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default ImageShow;