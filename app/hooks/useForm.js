import { useState, useCallback, useRef, useEffect } from "react";
import { isObject, withMapObj } from "../utils/validators";

export const isEmail = (str) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    str
  );
};

export const isFullName = (str) => {
  return /\w+(\s|-|')+\w+/.test(str);
};

export const isNumber = (str) => {
  return /(\d+){10,13}/.test(str);
};

export const isPassword = (str) => {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      str
    )
  )
    return "Strong";
  else if (/(?=.*[a-zA-Z]).{8,}/.test(str)) return "Medium";
  else return "Weak";
};

export const isLink = (str) => {
  try {
    return Boolean(new URL(str));
  } catch (e) {
    return false;
  }
};

export const isEmpty = (value) => {
  if (typeof value === "string" && !value) return true;
  else if (Array.isArray(value) && !value.length) return true;
  else if (value === undefined) return true;

  return false;
};

export const mergeFileList = (a = "", b = "") => {
  const dt = new DataTransfer();
  for (let i = 0; i < a.length; i++) {
    dt.items.add(a[i]);
  }
  if (b.length) {
    for (let i = 0; i < b.length; i++) {
      dt.items.add(b[i]);
    }
  } else if (b) dt.items.add(b);

  return dt.files;
};

export const splitNumberAndText = (input) => {
  const match = input.match(/^(\d+)(\D+)$/i);
  if (!match) return { number: NaN, text: "" };
  const number = Number(match[1]);
  const text = match[2].toLowerCase();
  return { number, text };
};

export const isFileList = (obj) => {
  return (
    obj && (obj.toString() === "[object FileList]" || obj[0] instanceof File)
  );
};

const useForm = (config = {}) => {
  const {
    defaultFormData,
    required = false,
    returnFilesArray = false,
    mergeFile = false,
    dataSize,
    dataType: dataTypeMap,
    maxUpload,
    maxDuration,
    withInvalidField,
    stateCheck = true,
    withStrongPwdOnly,
    isSubmitting: _isSubmitting,
    optional,
  } = config;

  const defaultFormDataRef = useRef(defaultFormData);

  const [isSubmitting, setIsSubmitting] = useState(!!_isSubmitting);
  const [formData, setFormData] = useState(defaultFormDataRef.current || {});
  const [errors, setErrors] = useState({});
  const [inputProps, setInputProps] = useState({});

  const stateRef = useRef({
    clean: {},
    required: {},
  });

  const deletePathFromObject = (
    obj,
    key = "",
    dataName = "",
    dataType = ""
  ) => {
    switch (dataType) {
      case "object":
        if (obj[key]) {
          delete obj[key][dataName];
          !Object.keys(obj[key]).length && delete obj[key];
        }
        break;
      default:
        delete obj[key];
        break;
    }
    return obj;
  };

  const handleSubmit = useCallback(
    (e = undefined, options = {}) => {
      try {
        const {
          formData: form,
          validateTypeMap,
          errDelMap,
          withStrongPwdOnly,
          bareMessage,
          excludeMap,
          errMap,
        } = options;

        if (
          e &&
          (e.currentTarget?.nodeName.toLowerCase() === "form" ||
            e.target?.nodeName.toLowerCase() === "form")
        ) {
          e.preventDefault();
          e.stopPropagation();
          stateRef.current.form = e.target || e.currentTarget;
        }

        if (isSubmitting) {
          return {
            errors,
            formData,
            isSubmitting,
          };
        }
        let withErr;

        const validate = (key, dataName, dataType) => {
          if (
            {
              ...excludeMap,
              confirmPassword: true,
            }[key] &&
            false
          )
            deletePathFromObject(formData, key, dataName, dataType);
          else {
            const keyValue =
              {
                object: formData[key]?.[dataName],
              }[dataType] || formData[key];

            if (
              keyValue &&
              (Array.isArray(keyValue) &&
              (keyValue.length ? false : optional && !optional[key])
                ? false
                : true)
            ) {
              const _key = dataName || key;

              if (
                errDelMap
                  ? errDelMap[key]
                  : !withStrongPwdOnly && key === "password"
              )
                delete errors[key];
              else if (validateTypeMap && !errors[_key]) {
                switch (validateTypeMap[key]) {
                  case "email":
                    if (!isEmail(keyValue)) {
                      errors[_key] = "Invalid Email address";
                      withErr = true;
                    }
                    break;
                  case "password":
                    const status = isPassword(keyValue);
                    if (withStrongPwdOnly && status !== "Strong") {
                      errors[_key] = `${status} password`;
                      withErr = true;
                    }
                    if (formData.confirmPassword) {
                      if (keyValue === formData.confirmPassword)
                        delete errors.confirmPassword;
                      else errors.confirmPassword = `password don't match`;
                    }
                    break;
                  case "confirmPassword":
                    if (keyValue !== formData.password) {
                      errors[key] = `password don't match.`;
                      withErr = true;
                    }
                    break;
                  default:
                    if (errMap) {
                      withErr = true;
                      for (const key in errMap) {
                        errors[key] = errMap[key];
                      }
                    }
                    break;
                }
              }

              if (!withErr) {
                if (form?.append) {
                  if (
                    dataType === "array" ||
                    dataType === "fileList" ||
                    isFileList(keyValue)
                  ) {
                    for (const prop in keyValue) {
                      if (Number(prop) > -1 && keyValue[prop])
                        form.append(`${key}`, keyValue[prop]);
                    }
                  } else if (dataType === "object")
                    form.append(`${key}[${dataName}]`, keyValue);
                  else form.set(key, keyValue);
                }
              }
            } else {
              if (
                optional &&
                !optional[key] &&
                (required === true || required[dataName || key]) &&
                isEmpty(formData[key])
              ) {
                withErr = true;

                const e = bareMessage ? "required" : "This field is required";

                errors[dataName || key] =
                  required === true || required[dataName || key]
                    ? e
                    : required[dataName || key] || e;
                // : `${(dataName || key).slice(0, 1).toUpperCase()}${(
                //     dataName || key
                //   ).slice(1)} is required`);
              }

              // else if (!withInvalidField) {
              //   deletePathFromObject(formData, key, dataName, dataType, true);
              //   setErrors((errors) => {
              //     deletePathFromObject(errors, key, dataName, dataType);
              //     return {
              //       ...errors,
              //     };
              //   });
              // }
            }
          }
        };

        if (formData)
          for (const key in {
            ...formData,
            ...(required === true ? {} : required),
            ...stateRef.current.required,
          }) {
            const dataType = dataTypeMap?.[key];

            switch (dataType) {
              case "object":
                for (const _key in formData[key]) {
                  validate(key, _key, dataType);
                }
                break;
              default:
                validate(key);
                break;
            }
          }
        else {
          withErr = true;
          errors.all = true;
        }

        if (withErr) setErrors({ ...errors });

        let _formData = formData;
        let _errors = null;

        if (!required || !withErr) {
          setIsSubmitting(true);
          _errors = null;
          _formData = form?.append
            ? form
            : form
            ? Object.assign(form, formData)
            : Object.assign({}, formData);

          for (const key in stateRef.current.clean) {
            let v = _formData[key];

            if (Array.isArray(v)) {
              v = v.filter((i) => !!i);
            }

            _formData[key] = v;
          }
        } else {
          setIsSubmitting(false);
          _errors = errors;
        }
        return {
          errors: _errors,
          formData: _formData,
        };
      } catch (err) {
        console.error(err);
      }
    },
    [formData, required, errors, dataTypeMap, optional, isSubmitting]
  );

  const handleChange = useCallback(
    (e, validate) => {
      e.stopPropagation && e.stopPropagation();

      if (isSubmitting) return;

      const node = e.currentTarget || e.target;

      const key = node.name || node.dataset.name || node.getAttribute("name");
      const dataType = dataTypeMap?.[key];

      let {
        name: dataName,
        min: dataMin,
        max: dataMax,
        validateType = "true",
        innerText,
        formIndex,
        formValue: dataFormValue,
      } = node.dataset || {};

      const nodeName = node.nodeName.toLowerCase();

      let { formForRequired = nodeName === "select" ? "*" : "" } =
        Object.assign({}, node.parentElement?.dataset || {}, node.dataset);

      validateType = validateType === "true";
      innerText = innerText === "true";

      const value =
        node.type === "file"
          ? node.multiple
            ? node.files
            : node.files?.[0]
          : node.type === "checkbox"
          ? node.checked
          : innerText
          ? node.innerText || ""
          : node.value;

      if (!stateRef.current[key]) {
        stateRef.current[key] = {
          required: node.required,
        };

        node.required = false;
      }

      const _required =
        (optional && optional[key]) || node.type === "radio"
          ? false
          : required
          ? required === true ||
            stateRef.current.required[key] ||
            {
              object: required[key]?.[dataName],
            }[dataType] ||
            required[key]
          : stateRef.current[key].required;

      setFormData((formData = {}) => {
        let withErr;

        const addError = (error, _key, index) => {
          if (!error) return;
          withErr = true;

          setErrors((errors) => {
            _key = _key || key;

            if (index !== undefined) {
              if (!errors[_key]) errors[_key] = {};
              errors[_key][index] = error;
            } else {
              errors[_key] =
                {
                  object: {
                    ...errors[_key],
                    [dataName]: error,
                  },
                }[dataType] || error;
            }
            return {
              ...errors,
            };
          });
        };

        setIsSubmitting(false);

        let keyValue =
          {
            object: {
              ...formData?.[key],
              [dataName]: value,
            },
          }[dataType] || value;

        if (formForRequired) {
          const deleteFormForRequired = (key = formForRequired) => {
            delete stateRef.current.required[key];

            delete formData[key];

            setErrors((errors) => {
              delete errors[key];
              return {
                ...errors,
              };
            });
          };

          if (formForRequired === "*") {
            formForRequired = {
              select: node.options[node.selectedIndex].dataset?.formForRequired,
            }[nodeName];

            const prevFormForRequired = node.dataset?.formForRequired;

            if (prevFormForRequired) deleteFormForRequired(prevFormForRequired);

            formForRequired &&
              node.setAttribute("data-form-for-required", formForRequired);
          }

          if (typeof formForRequired === "string") {
            if (value) stateRef.current.required[formForRequired] = true;
            else deleteFormForRequired();
          }
        }

        if (formIndex !== undefined) {
          formIndex = Number(formIndex);
          keyValue = (formData[key] || []).slice();

          stateRef.current.clean[key] = true;

          if (node.type === "checkbox") {
            if (value) {
              keyValue[formIndex] = dataFormValue || value;
              setErrors((errors) => {
                delete errors[key];
                return {
                  ...errors,
                };
              });
            } else {
              keyValue.splice(formIndex, 1, "");

              let _withErr = true;

              for (const v of keyValue) {
                if (v) {
                  _withErr = false;
                  break;
                }
              }

              if (_withErr) addError("This field is required");
            }
          }
        }

        setErrors((errors) => {
          if (
            errors.all &&
            (Object.keys(formData).length === dataSize ||
              Object.keys(errors).length === dataSize)
          ) {
            delete errors.all;
            errors = {
              ...errors,
            };
          }
          return errors;
        });

        if (keyValue || _required) {
          if (_required && !keyValue)
            addError(
              typeof _required === "string"
                ? _required
                : "This field is required",
              //`${key.slice(0, 1).toUpperCase()}${key.slice(1)} is required`,
              key
            );
          else {
            if (dataMin) {
              dataMin = Number(dataMin) || 0;
              if (keyValue.length < dataMin) {
                addError(`Minimum of ${dataMin} characters`, key);
                if (key === "password" && formData.confr)
                  addError(`Password don't match`, "confirmPassword");
              }
            }

            if (dataMax) {
              dataMax = Number(dataMax) || 0;
              if (dataMax && keyValue.length > dataMax) {
                keyValue = formData[key];
                withErr = true;
              }
            }

            if (node.type === "file") {
              validateType = false;
              const validateFileMax = (text, type) => {
                let digit;
                const isUp = type === "upload";
                const obj = splitNumberAndText(text);
                const errKey = key + "-" + type;
                if (!obj.number) addError(`Maximum ${type} exceeded`, errKey);
                else {
                  digit = isUp
                    ? { mb: 1000000, gb: 1000000000 }[obj.text]
                    : { s: 1, h: 3600, m: 60 }[obj.text] || NaN;
                  if (digit) digit = obj.number * digit;
                  else addError(`Maximum ${type} exceeded`, errKey);
                }

                if (digit) {
                  if (type === "duration") {
                    const validateDur = (file, index) => {
                      if (
                        file.type.indexOf("video") >= 0 ||
                        file.type.indexOf("audio") >= 0
                      ) {
                        // invalidate key until loaded and validated
                        withErr = true;
                        setErrors((errors) => {
                          if (index > -1) {
                            if (!errors[errKey]) errors[errKey] = {};
                            errors[errKey][index] = "";
                          } else errors[errKey] = "";
                          return {
                            ...errors,
                          };
                        });
                        const url = URL.createObjectURL(file);
                        const audio = new Audio(url);
                        const metadataListener = () => {
                          if (audio.duration > digit) {
                            addError(
                              `Maximum duration exceeded`,
                              errKey,
                              index
                            );
                          } else
                            setErrors((errors) => {
                              if (errors[errKey] !== undefined) {
                                if (index > -1) {
                                  delete errors[errKey][index];
                                  !Object.keys(errors[errKey]).length &&
                                    delete errors[errKey];
                                } else delete errors[errKey];
                                return {
                                  ...errors,
                                };
                              } else return errors;
                            });

                          URL.revokeObjectURL(url);
                          audio.removeEventListener(
                            "loadedmetadata",
                            metadataListener,
                            false
                          );
                        };

                        const errorListener = ({ target: { error } }) => {
                          addError(
                            {
                              message: error.message,
                              code: error.code,
                              name: error.name,
                            },
                            errKey,
                            index
                          );
                          URL.revokeObjectURL(url);
                          audio.removeEventListener(
                            "error",
                            errorListener,
                            false
                          );
                        };
                        audio.addEventListener(
                          "loadedmetadata",
                          metadataListener,
                          false
                        );
                        audio.addEventListener("error", errorListener, false);
                      }
                    };
                    if (node.multiple) {
                      for (const index in keyValue) {
                        if (Number(index) > -1)
                          validateDur(keyValue[index], index);
                      }
                    } else validateDur(keyValue, undefined);
                  } else {
                    if (node.multiple) {
                      for (const index in keyValue) {
                        if (Number(index) > -1 && keyValue[index].size > digit)
                          addError(`Maximum upload exceeded`, errKey, index);
                      }
                    } else if (keyValue.size > digit)
                      addError(`Maximum upload exceeded`, errKey);
                  }
                }
              };

              if (maxDuration) validateFileMax(maxDuration, "duration");

              if (maxUpload) validateFileMax(maxUpload, "upload");

              if (node.multiple) {
                if (mergeFile) {
                  if (returnFilesArray) {
                    keyValue = Array.from(formData[key] || "").concat(
                      keyValue.length ? Array.from(keyValue) : keyValue
                    );
                  } else keyValue = mergeFileList(formData[key], keyValue);
                } else if (returnFilesArray) keyValue = Array.from(keyValue);
              }
            }
            if (!withErr) {
              const withValidate = typeof validate === "function";
              const prop = {
                key,
                keyValue,
                value,
                dataName,
                dataType,
                error: "",
              };

              if (validateType) {
                if (withValidate) addError(validate(prop));
                else
                  switch (key === "confirmPassword" ? key : node.type || key) {
                    case "email":
                      if (!isEmail(value))
                        addError((prop.error = "Invalid email address"));
                      break;
                    case "url":
                      if (!isLink(value))
                        addError((prop.error = "Invalid URL"));
                      break;
                    case "password":
                      const status = isPassword(value);
                      if (status !== "Strong")
                        addError((prop.error = `${status} password`));

                      if (formData.confirmPassword) {
                        if (value === formData.confirmPassword)
                          status === "Strong" &&
                            setErrors((errors) => {
                              deletePathFromObject(errors, "confirmPassword");
                              return errors;
                            });
                        else
                          addError(`Password don't match`, "confirmPassword");
                      }
                      break;
                    case "confirmPassword":
                      if (value !== formData.password)
                        addError((prop.error = `Password don't match.`));
                      break;

                    default:
                      break;
                  }
              } else if (withValidate) addError(validate(prop));
            }

            if (!withErr)
              // no error
              setErrors((errors) => {
                deletePathFromObject(errors, key, dataName, dataType);
                return errors;
              });
          } // with value end of else
        } else if (!withInvalidField) {
          setErrors((errors) => {
            deletePathFromObject(errors, key, dataName, dataType);
            return {
              ...errors,
            };
          });
          deletePathFromObject(formData, key, dataName, dataType);
          return { ...formData };
        }

        return {
          ...formData,
          [key]: keyValue,
        };
      });
    },
    [
      dataTypeMap,
      dataSize,
      required,
      withInvalidField,
      maxUpload,
      maxDuration,
      mergeFile,
      returnFilesArray,
      optional,
      isSubmitting,
    ]
  );

  const reset = useCallback((formData, config = {}) => {
    setIsSubmitting(
      typeof config.isSubmitting === "boolean" ? config.isSubmitting : false
    );

    if (config.resetErrors) setErrors({});
    else if (config.errors) setErrors(config.errors);

    if (config.stateHook)
      Object.assign(
        stateRef.current,
        config.stateHook({ required: stateRef.current.required }, setErrors)
      );

    if (typeof formData === "function" || isObject(formData)) {
      if (stateRef.current.form) stateRef.current.form.reset();
      setFormData(formData);
    } else if (!formData) {
      if (stateRef.current.form) stateRef.current.form.reset();
      setFormData(config.defaultData || defaultFormDataRef.current || {});
    }
  }, []);

  const removeField = useCallback(
    (key) => {
      reset(
        (formData) => {
          delete formData[key];
          return {
            ...formData,
          };
        },
        {
          errors: (errors) => {
            delete errors[key];
            return {
              ...errors,
            };
          },
        }
      );
    },
    [reset]
  );

  let isInValid;

  if (stateCheck) {
    const _errors = { ...errors };

    if (_errors.password === "Medium password") delete _errors.password;

    isInValid =
      !!Object.keys(_errors).length ||
      (required === true
        ? !Object.keys(formData).length
        : withMapObj(required, formData, false));
  }

  const register = (key) => {
    if (required === true) stateRef.current.required[key] = true;
    return {
      name: key,
      value: formData[key] || "",
      error: errors[key],
      onChange: handleChange,
      disabled: isSubmitting,
    };
  };

  return {
    register,
    formData: formData || defaultFormDataRef.current || {},
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setErrors,
    isInValid,
    setIsSubmitting,
    removeField,
    setFormData,
  };
};

export default useForm;
