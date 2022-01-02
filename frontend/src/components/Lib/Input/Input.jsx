import React, { Component, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Input, Icon, Label } from "semantic-ui-react";
import "./input.scss";

export default class extends Component {
  constructor(props) {
    super(props);
    this.customInputRef = React.createRef();
    this.state = {
      textVisibility: false,
      loading: false,
      icon: null,
      error: this.props.validationError || {
        isError: false,
        text: "",
      },
    };
  }

  render() {
    const {
      placeholder,
      onChange,
      value,
      type = "text",
      name,
      onCheck,
      defaultValue,
      validationError,
    } = this.props;
    const { textVisibility, loading, icon, error } = this.state;
    return (
      <div className="input-wrap" ref={this.customInputRef}>
        <span
          className={`input-placeholder ${
            type === "date" ? "active" : value ? "active" : ""
          }`}
        >
          {placeholder}
        </span>
        <Input
          error={validationError.isError}
          loading={loading}
          name={name}
          value={value ? value : ""}
          onChange={onChange}
          onFocus={(e) => {
            const node = this.customInputRef.current;
            const placeholder = node.children.item("span.input-placeholder");
            if (!placeholder.classList.contains("active")) {
              placeholder.classList.add("active");
            }
            this.setState(
              {
                icon: null,
                error: {
                  isError: false,
                  text: "",
                },
              },
              () => {
                onChange(e);
              }
            );
          }}
          onBlur={(e) => {
            const node = this.customInputRef.current;
            const placeholder = node.children.item("span.input-placeholder");
            if (!e.target.value && type !== "date") {
              placeholder.classList.remove("active");
            }
            if (onCheck && value !== "" && value && value !== defaultValue) {
              this.setState({
                loading: true,
              });
              onCheck(value, (checked) => {
                if (checked.success) {
                  this.setState({
                    loading: false,
                    icon: {
                      name: "check",
                      color: "green",
                    },
                  });
                } else {
                  this.setState(
                    {
                      loading: false,
                      icon: {
                        name: "close",
                        color: "red",
                      },
                      error: {
                        isError: true,
                        text: checked.msg,
                      },
                    },
                    () => {
                      onChange(e, {
                        isError: true,
                        text: checked.msg,
                      });
                    }
                  );
                }
              });
            } else if (value === "") {
              this.setState({
                icon: null,
              });
            } else if (value === defaultValue) {
              this.setState({
                icon: null,
              });
            }
          }}
          icon={
            icon ? (
              <Icon name={icon.name} color={icon.color} />
            ) : type === "password" ? (
              <Icon
                name={textVisibility ? "eye slash" : "eye"}
                link
                onClick={() => {
                  this.setState({
                    textVisibility: !this.state.textVisibility,
                  });
                }}
              />
            ) : null
          }
          type={
            type === "date"
              ? "date"
              : type === "text"
              ? "text"
              : textVisibility === false
              ? "password"
              : "text"
          }
        />
        {validationError.isError ? (
          <Label prompt pointing="above">
            {validationError.text}
          </Label>
        ) : null}
      </div>
    );
  }
}
