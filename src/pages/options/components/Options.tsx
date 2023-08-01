import React, { useState } from "react";

const Options = () => {
    const [option, setOption] = useState("");
    const [radioOption, setRadioOption] = useState("");

    const handleOptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setOption(event.target.value);
    };

    const handleRadioOptionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRadioOption(event.target.value);
    };

    return (
        <div className="OptionsContainer">
            <h1>Options</h1>
            <form>
                <div>
                    <label>
                        Option:
                        <p>
                            <select
                                value={option}
                                onChange={handleOptionChange}
                            >
                                <option value="">
                                    -- Please choose an option --
                                </option>
                                <option value="option_a">Option A</option>
                                <option value="option_b">Option B</option>
                                <option value="option_c">Option C</option>
                            </select>
                        </p>
                    </label>
                </div>
                <div>
                    <label>
                        Radio Option:
                        <p>
                            <input
                                type="radio"
                                value="radio_option_a"
                                checked={radioOption === "radio_option_a"}
                                onChange={handleRadioOptionChange}
                            />
                            Radio Option A
                        </p>
                        <p>
                            <input
                                type="radio"
                                value="radio_option_b"
                                checked={radioOption === "radio_option_b"}
                                onChange={handleRadioOptionChange}
                            />
                            Radio Option B
                        </p>
                        <p>
                            <input
                                type="radio"
                                value="radio_option_c"
                                checked={radioOption === "radio_option_c"}
                                onChange={handleRadioOptionChange}
                            />
                            Radio Option C
                        </p>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Options;
