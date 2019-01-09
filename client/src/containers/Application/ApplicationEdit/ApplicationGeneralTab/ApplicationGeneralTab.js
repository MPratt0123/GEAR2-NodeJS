import React, {Component} from 'react';
import * as valueLists from "../../../../valuelists";
import Spinner from "../../../../components/UI/Spinner/Spinner";

import {withRouter} from "react-router";
import {connect} from 'react-redux';
import Input from "../../../../components/presentational/Input";
import validate from "validate.js";

import './ApplicationGeneralTab.css';

import { bindActionCreators } from 'redux';
import {
    loadApplicationGeneral, loadApplicationGeneralStart, updateFieldApp, saveApplicationGeneralStart
} from "../../../../actions/applicationActions";

class ApplicationGeneralTab extends Component {
    constructor (props) {
        super (props);
        this.props.saveApplicationGeneralStart();
        this.props.loadApplicationGeneralStart();
        this.props.loadApplicationGeneral(this.props.id);
        this.state = {
            editForm: {
                id: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'ID',
                        disabled: true
                    },
                    constraints: {},
                    valid: true,
                    touched: false,
                    value: null
                },
                keyname: {
                    elementType: 'text',
                    elementConfig: {
                        required: true,
                        placeholder: 'Application Name',
                        label: 'Application Name'
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                        length: {maximum: 150}
                    },
                    valid: true,
                    touched: false,
                    value: null
                },
                applicationAlias: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Alias'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                displayName: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Short name will appear in graphic',
                        required: true
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                        length: {maximum: 25}
                    },
                    valid: true,
                    value: null
                },
                description: {
                    elementType: 'text',
                    elementConfig: {
                        multiline: true,
                        required: true,
                        label: "Description"
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: null
                },
                objApplicationStatusId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Application Status',
                        takes: 'number',
                        required: true,
                        choices: valueLists.ApplicationStatuses
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: null
                },
                applicationOrWebsite: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        required: true,
                        label: 'Application Or Website',
                        choices: valueLists.AppOrWebChoices
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                    },
                    valid: true,
                    value: null
                },
                objParentSystemId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Parent System',
                        alien: true,
                        endpoint: 'parents',
                        takes: 'number',
                        choices: this.props.staticRepo.parents
                    },
                    constraints: {},
                    valid: true,
                    value: null
                }
            }
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let message;

        const updatedEditForm = {
            ...this.state.editForm
        };
        const updatedFormElement = {...updatedEditForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        this.props.updateFieldApp({[inputIdentifier]: updatedFormElement});

        const isValid = validate({
            [inputIdentifier]: event.target.value
        }, {
            [inputIdentifier]: updatedFormElement.constraints
        });
        updatedFormElement.valid = !isValid;
        if (isValid) {
            updatedFormElement.errHelperText = isValid[inputIdentifier][0];
        }
        updatedFormElement.touched = true;
        updatedEditForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for (let inputIdentifier in updatedEditForm) {
            if (updatedEditForm[inputIdentifier].valid !== undefined) {
                isFormValid = updatedEditForm[inputIdentifier].valid && isFormValid;
                if (!updatedEditForm[inputIdentifier].valid) {
                    message = updatedEditForm[inputIdentifier].errHelperText;
                }
            }
        }

        this.props.fromParent(isFormValid, message);

        //create form should now have all elements including multiselect
        this.setState({editForm: updatedEditForm, isFormValid: isFormValid});
    };

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.application.id && !this.state.loaded && !nextProps.application.loading) {
            const updatedEditForm = {...this.state.editForm};
            for (let inputIdentifier in updatedEditForm) {
                const updatedFormElem = {...updatedEditForm[inputIdentifier]};
                updatedFormElem.value = nextProps.application[inputIdentifier];

                if (updatedFormElem.elementConfig && updatedFormElem.elementConfig.alien) {
                    const updatedElemConfig = {...updatedEditForm[inputIdentifier].elementConfig};
                    updatedElemConfig.choices = nextProps.staticRepo[updatedFormElem.elementConfig.endpoint] ?
                        nextProps.staticRepo[updatedFormElem.elementConfig.endpoint] : [];
                    updatedFormElem.elementConfig = updatedElemConfig;
                }
                updatedEditForm.valid = true;
                updatedEditForm[inputIdentifier] = updatedFormElem;
            }
            this.setState({editForm: updatedEditForm, loaded: true});
        }
    }

    render () {
        let simpleForm = <Spinner/>;

        if (!this.props.application.loading) {
            const formElements = [];
            const consolidatedForm = {...this.state.editForm};
            for (let key in consolidatedForm) {
                formElements.push({
                    id: key,
                    config: this.state.editForm[key]
                })
            }
            simpleForm = (
                formElements.map(elem => {
                    return (
                        <Input
                            key={elem.id}
                            elemType={elem.config.elementType}
                            elementConfig={elem.config.elementConfig}
                            valid={elem.config.valid}
                            touched={elem.config.touched}
                            value={elem.config.value}
                            errHelperText={elem.config.errHelperText}
                            changed={(event) => this.inputChangedHandler(event, elem.id)}
                        />
                    )
                })
            );
        }
        return (
            <div className="ApplicationGeneralTab">
                {simpleForm}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    application: state.appGeneral,
    staticRepo: state.staticRepo
});

function mapDispatchToProps (dispatch) {
    return {
        loadApplicationGeneral: bindActionCreators(loadApplicationGeneral, dispatch),
        loadApplicationGeneralStart: bindActionCreators(loadApplicationGeneralStart, dispatch),
        saveApplicationGeneralStart: bindActionCreators(saveApplicationGeneralStart, dispatch),
        updateFieldApp: bindActionCreators(updateFieldApp, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationGeneralTab));