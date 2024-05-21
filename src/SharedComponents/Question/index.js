const Question = ({ data, index, key }) => {
  switch (data.type) {
    case "MCQ_SINGLE":
      return (
        <div className="h-full w-full my-3">
          <div className="flex items-center gap-6 mb-2">
            <p className="font-semibold text-lg">
              {`${index + 1}. ${data.question}`}
            </p>
            <p className="bg-green-300 px-2 py-1 rounded-full text-sm text-green-600 font-semibold">
              {data.marks} marks
            </p>
          </div>
          <div className="flex flex-col items-start">
            {data.options.map((option) => (
              <div key={option.id}>
                <input type="radio" value={option.id} disabled />
                <label
                  className={`${
                    option.id == data.correctOption
                      ? "text-green-500 font-bold"
                      : ""
                  } pl-3`}
                >
                  {`${
                    option.id == data.correctOption
                      ? `${option.value} (Correct Answer)`
                      : option.value
                  }`}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    case "MCQ_MULTIPLE":
      return (
        <div className="h-full w-full flex justify-center items-center">
          MCQ_MULTIPLE
        </div>
      );
    case "FILL":
      return (
        <div className="h-full w-full my-3">
          <div className="flex items-center gap-6 mb-2">
            <p className="font-semibold text-lg">
              {`${index + 1}. ${data.question}`}
            </p>
            <p className="bg-green-300 px-2 py-1 rounded-full text-sm text-green-600 font-semibold">
              {data.marks} marks
            </p>
          </div>
          <p className="text-green-500 font-bold">A: {data.correct_answer}</p>
        </div>
      );
    default:
      return (
        <div className="h-full w-full flex justify-center items-center">
          WRITEUP
        </div>
      );
  }
};

export default Question;
