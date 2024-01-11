import { Contents } from '@src/configs/types';
import { EmbeddingRequestResult } from '@src/pages/content/shared/hooks/useEmbeddingRequest';
import useGlobalLangState from '@src/pages/content/shared/hooks/useGlobalLangState';

interface EmbeddingRequestSectionProps {
  embeddingRequestResult: EmbeddingRequestResult;
  requestEmbedding: () => void;
}

const data: { buttonText: Contents<string> } = {
  buttonText: { en: 'Request Embedding', ko: '임베딩 요청하기' },
};

const EmbeddingRequestSection = ({
  embeddingRequestResult,
  requestEmbedding,
}: EmbeddingRequestSectionProps) => {
  const lang = useGlobalLangState();
  const requestable = embeddingRequestResult.type === 'pending';

  return (
    <section className="youtube-content__embedding-request-section">
      <span className="youtube-content__embedding-request-section--result-message">
        {embeddingRequestResult.message[lang]}
      </span>
      {requestable && (
        <button
          className="youtube-content__embedding-request-section--request-button"
          type="button"
          onClick={requestEmbedding}
        >
          {data.buttonText[lang]}
        </button>
      )}
    </section>
  );
};

export default EmbeddingRequestSection;
