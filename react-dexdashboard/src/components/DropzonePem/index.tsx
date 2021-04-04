import moment from 'moment';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { useContext } from '../../context';
import decodePem from '../../helpers/decodePem';
interface DropzonePemType {
  setFieldValue: any;
  fieldName: string;
  errors: any;
  pubKeyLength: number;
  multiple?: boolean;
  unique?: boolean;
  blacklist?: string[];
}

export interface DropzoneFileType {
  id: string;
  name: string;
  pubKey: string;
  value: any;
  signature: any;
  errors: string[];
}

const DropzonePem = ({
  setFieldValue,
  fieldName,
  errors,
  pubKeyLength,
  multiple,
  unique,
}: DropzonePemType) => {
  const [files, setFiles] = React.useState<DropzoneFileType[]>([]);

  const getKeyErrors = (pubKey: string, existing: DropzoneFileType[]) => {
    const errors: string[] = [];

    if (pubKey.length !== pubKeyLength) {
      errors.push('length');
    }

    if (unique === true) {
      const found = existing.filter(file => file.pubKey === pubKey);
      if (found.length > 1) {
        errors.push('unique');
      }
    }

    return errors;
  };

  const updateFieldValue = () => {
    if (files.length > 0) {
      const updatedFiles = [...files];

      updatedFiles.forEach(file => {
        file.errors = getKeyErrors(file.pubKey, updatedFiles);
      });

      setFieldValue(fieldName, updatedFiles);
    }
  };
  React.useEffect(updateFieldValue, [files]);

  const getUpdatedFiles = ({
    existing,
    name,
    pubKey,
    value,
    signature,
  }: {
    existing: DropzoneFileType[];
    name: string;
    pubKey: string;
    value: any;
    signature: any;
  }) => {
    const updated = [...existing];
    const file = updated.find(item => item.name === name);

    if (file) {
      file.value = value;
    } else {
      updated.push({
        id: `${name}-${moment().unix()}`,
        name,
        pubKey,
        value,
        signature,
        errors: [],
      });
    }
    return updated;
  };

  const { delegationContract } = useContext();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.pem',
    multiple,
    onDrop: async (files: any) => {
      const onload = (fileReader: any, name: string) => async (e: any) => {
        try {
          let { value, pubKey, signature } = await decodePem(
            fileReader.result!,
            delegationContract
          );
          setFiles(existing => {
            return getUpdatedFiles({ existing, value, pubKey, name, signature });
          });
        } catch (e) {
          console.error('error decode pem', e);
          setFiles(existing => {
            return getUpdatedFiles({ existing, value: '', pubKey: '', name, signature: '' });
          });
          return;
        }
      };

      files.forEach((file: any) => {
        const { name } = file;
        const fileReader = new FileReader();
        fileReader.onload = onload(fileReader, name);
        fileReader.readAsText(file);
      });
    },
  });
  const onclick = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  const disabledOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const remove = (id: string) => {
    setFiles(existing => {
      let updated = [...existing];
      updated = updated.filter(item => item.id !== id);
      setFieldValue(fieldName, updated);
      return updated;
    });
  };

  const isInvalid = errors[fieldName] ? 'is-invalid' : '';
  const fileWord = multiple === false ? 'file' : 'files';
  const inputProps = getInputProps();
  if (multiple === false) {
    delete inputProps.multiple;
  }

  return (
    <>
      <div
        {...getRootProps({
          className: `dropzone border border-muted rounded ${
            files.length > 0 ? 'p-0' : 'p-3'
          } ${isInvalid}`,
        })}
      >
        <input {...inputProps} data-testid="inputPem" />
        {isDragActive ? (
          <div className="dropzone-area text-center">
            Drag and drop your PEM {fileWord} here, or{' '}
            <a href="/" onClick={onclick}>
              Select {fileWord}
            </a>
          </div>
        ) : (
          <>
            {files.length > 0 ? (
              <div className="dropzone-area text-center has-file">
                {files.map(({ id, name, errors }, i) => (
                  <div
                    key={id}
                    className={`file border rounded m-1 ${
                      errors.length > 0 ? 'border-danger' : ''
                    } `}
                    onClick={disabledOnClick}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="ml-2 mb-0" id={id} data-testid={`uploadLabel${i}`}>
                        {name}
                      </p>
                      <span
                        className="pr-2"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          remove(id);
                        }}
                        style={{
                          cursor: 'pointer',
                          userSelect: 'none',
                          verticalAlign: '-0.1rem',
                        }}
                      >
                        <span aria-hidden="true">×</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`dropzone-area text-center ${isInvalid}`}>
                Drag and drop your PEM {fileWord} here, or{' '}
                <a href="/" onClick={onclick}>
                  Select {fileWord}
                </a>
              </div>
            )}
          </>
        )}
      </div>
      {isInvalid && (
        <p data-testid="pemError">
          <small className="text-danger">{errors[fieldName]}</small>
        </p>
      )}
    </>
  );
};

export default DropzonePem;
