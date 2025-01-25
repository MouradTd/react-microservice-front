interface Props {
    title: string;
}

const Error: React.FC<Props> = ({ title }) => {
    return (
        <div className="grid h-screen px-4 bg-white place-content-center">
            <h1 className="tracking-widest text-gray-500 uppercase"> {title} </h1>
        </div>
    );
};

export const Error404: React.FC = () => <Error title="404 | Not Found" />;
export const Error500: React.FC = () => <Error title="500 | Internal Error" />;
