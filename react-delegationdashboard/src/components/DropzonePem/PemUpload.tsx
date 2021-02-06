import { Formik } from 'formik';
import * as React from 'react';
import { object, array, mixed } from 'yup';
import DropzonePem, { DropzoneFileType } from './index';

const PlaygroundPemUpload = ({
  handleClose,
  onSubmit,
}: {
  handleClose: () => void;
  onSubmit: (pemFiles: DropzoneFileType[]) => void;
}) => {
  const initialValues: { pemFiles: DropzoneFileType[] } = { pemFiles: [] };
  const ref = React.useRef(null);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ pemFiles }) => {
        onSubmit(pemFiles);
      }}
      validationSchema={object().shape({
        pemFiles: array()
          .of(mixed())
          .test('validKeyLength', 'Invalid PEM file', (value: DropzoneFileType[] | undefined) => {
            return !!value && value.every(file => !file.errors.includes('length'));
          })
          .test(
            'keyIsUnique',
            'Duplicate key detected',
            (value: DropzoneFileType[] | undefined) => {
              return !!value && value.every(file => !file.errors.includes('unique'));
            }
          )
          .required('PEM file is required'),
      })}
    >
      {props => {
        const { setFieldValue, handleSubmit, errors } = props;

        return (
          <form onSubmit={handleSubmit} ref={ref} className="pt-spacer">
            <div className="form-group mb-0">
              <DropzonePem
                setFieldValue={setFieldValue}
                fieldName="pemFiles"
                errors={errors}
                pubKeyLength={192}
                unique={true}
              />
            </div>
            <div className="d-flex align-items-center flex-column mt-spacer">
              <button type="submit" className="btn btn-primary px-spacer">
                Continue
              </button>
              <div className="mt-3 btn btn-link" onClick={handleClose}>
                Close
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default PlaygroundPemUpload;
