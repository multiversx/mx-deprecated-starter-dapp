import ModalActionButton from 'components/ModalActionButton';
import { Formik } from 'formik';
import * as React from 'react';
import { object, array, mixed } from 'yup';
import DropzonePem, { DropzoneFileType } from './index';

const PemUpload = ({
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
          <form onSubmit={handleSubmit} ref={ref}>
            <div className="form-group mb-0">
              <DropzonePem
                setFieldValue={setFieldValue}
                fieldName="pemFiles"
                errors={errors}
                pubKeyLength={192}
                unique={true}
                multiple={true}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center flex-wrap mt-spacer">
              <ModalActionButton
                action="addNodes"
                actionTitle="Add nodes"
                handleClose={handleClose}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default PemUpload;
