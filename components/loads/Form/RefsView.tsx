import { ArrayHelpers, Formik, getIn } from "formik";
import React from "react";
import { Button, Col, Form, InputGroup, ListGroup } from "react-bootstrap";

interface Props {
  arrayHelpers: ArrayHelpers;
  handleChange: any;
  values: any;
}

const RefsView: React.FC<Props> = (props) => {
  const { arrayHelpers, values, handleChange } = props;
  return (
    <div>
      {values.references.map((ref, index) => (
        <InputGroup key={index}>
          <Form.Control
            type="text"
            name={`references.${index}.name`}
            placeholder="Reference Name"
            value={values.references[index].name}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            name={`references.${index}.value`}
            placeholder="Reference Value"
            value={values.references[index].value}
            onChange={handleChange}
          />
          <InputGroup.Append>
            <Button
              onClick={() => arrayHelpers.push(values)}
              variant="outline-success"
            >
              ADD
            </Button>
          </InputGroup.Append>
        </InputGroup>
      ))}
    </div>
  );
};

export default RefsView;
