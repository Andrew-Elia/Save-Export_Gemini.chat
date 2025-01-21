// cleaning unwanted elements (un-necessary)

deleteArray = document.querySelectorAll(
  ".response-container-header, .response-container-footer, button, freemium-file-upload-quota-exceeded-disclaimer, .restart-chat-button-scroll-placeholder, freemium-rag-disclaimer, .related-search-footer, .feedback-form-turn-index, sensitive-memories-banner, .response-footer, .skeleton-loader-container"
);
deleteArray.forEach((element) => {
  element.remove();
});
