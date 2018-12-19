import React, {Component} from 'react';
import {SimpleForm} from 'react-admin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    saveNewApplication,
    saveApplication,
    saveApplicationStart
} from "../../../actions/applicationActions";
import {
    doesExist,
    doesExistInitiate
} from "../../../actions/validationActions"
import Input from "../../../components/presentational/Input";
import * as valueLists from "../../../valuelists";
import {withRouter} from "react-router";
import {removeDuplicates} from "../../../shared/utility";
import validate from 'validate.js';

class ApplicationCreateForm extends Component {
    constructor(props) {
        super(props);
        this.props.saveApplicationStart();
        this.state = {
            createForm: {
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
                    valid: false,
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
                    valid: false,
                    value: null
                },
                cloudIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Cloud',
                        takes: 'string',
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
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
                    valid: false,
                    value: null
                },
                mobileAppIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Mobile',
                        takes: 'string',
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                desktopIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        label: 'Desktop',
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                regionalClassification: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        label: 'Regional Classification',
                        choices: valueLists.RegionChoices
                    },
                    constraints: {},
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
                    valid: false,
                    value: null
                },
                numberOfUsers: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'number',
                        label: 'Number of users',
                        choices: valueLists.UserCountBreakdown
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                generateRevenueIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        takes: 'string',
                        label: 'Generates Revenue',
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objAppPlatformId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        takes: 'number',
                        label: 'Application Platform',
                        alien: true,
                        endpoint: 'platforms',
                        choices: this.props.application.platforms
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objAppHostingproviderId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        takes: 'number',
                        label: 'Application Hosting Provider',
                        alien: true,
                        endpoint: 'providers',
                        choices: this.props.application.providers
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                tier: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'Tier',
                        takes: 'number',
                        choices: valueLists.TierChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                productionYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Production Year'
                    },
                    constraints: {
                        presence: {allowEmpty: true},
                        numericality: {
                            greaterThan: 1950,
                            lessThan: 2050
                        }
                    },
                    valid: true,
                    value: null
                },
                retiredYear: {
                    elementType: 'text',
                    elementConfig: {
                        type: "number",
                        label: 'Retired Year'
                    },
                    constraints: {
                        numericality: {
                            greaterThan: 1950,
                            lessThan: 2050
                        },
                        presence: {allowEmpty: true},
                    },
                    valid: true,
                    value: null
                },
                url: {
                    elementType: 'text',
                    elementConfig: {
                        type: "url",
                        label: 'URL'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                cuiIndicator: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'name',
                        label: 'CUI',
                        'takes': 'string',
                        choices: valueLists.ConfirmChoices
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                uniqueIdentifierCode: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Unique Identifier Code',
                        required: true
                    },
                    constraints: {
                        presence: {allowEmpty: false},
                        length: {maximum: 30}
                    },
                    valid: true,
                    value: '0233-0000-0000000-xxxx'
                },
                referenceDocument: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Reference Document'
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objOrgSsoId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'SSO',
                        alien: true,
                        endpoint: 'users',
                        takes: 'number',
                        choices: this.props.application.users
                    },
                    constraints: {},
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
                        choices: this.props.application.parents
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objInvestmentId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Investment',
                        alien: true,
                        endpoint: 'investments',
                        takes: 'number',
                        choices: this.props.application.investments
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objPortfolioId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'Portfolio',
                        alien: true,
                        endpoint: 'portfolios',
                        takes: 'number',
                        choices: this.props.application.portfolios
                    },
                    constraints: {},
                    valid: true,
                    value: null
                },
                objFismaId: {
                    elementType: 'select',
                    elementConfig: {
                        nameField: 'keyname',
                        label: 'FISMA System',
                        takes: 'number',
                        alien: true,
                        endpoint: 'fismas',
                        choices: this.props.application.fismas
                    },
                    constraints: {},
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
                    valid: false,
                    value: null
                },
                applicationNotes: {
                    elementType: 'text',
                    elementConfig: {
                        label: 'Application Notes',
                        multiline: true
                    },
                    constraints: {},
                    valid: true,
                    value: null
                }
            },
            multipleSelect: {
                technologies: {
                    id: 'technologies',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technologies',
                        nameField: 'keyname',
                        alien: true,
                        endpoint: 'technologies',
                        choices: this.props.application.technologies
                    },
                    valid: true,
                    value: []
                },
                users: {
                    id: 'users',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Users',
                        nameField: 'keyname',
                        alien: true,
                        endpoint: 'users',
                        choices: this.props.application.users
                    },
                    valid: true,
                    value: []
                },
                capabilities: {
                    id: 'capabilities',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Capabilties',
                        nameField: 'keyname',
                        alien: true,
                        endpoint: 'capabilities',
                        choices: this.props.application.capabilities
                    },
                    valid: true,
                    value: []
                },
                business_pocs: {
                    id: 'business_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Business POCs',
                        nameField: 'keyname',
                        alien: true,
                        endpoint: 'pocs',
                        choices: this.props.application.pocs
                    },
                    valid: true,
                    value: []
                },
                technical_pocs: {
                    id: 'technical_pocs',
                    elementType: 'multiselect',
                    elementConfig: {
                        label: 'Technology POCs',
                        nameField: 'keyname',
                        alien: true,
                        endpoint: 'pocs',
                        choices: this.props.application.pocs
                    },
                    valid: true,
                    value: []
                }
            },
            isFormValid: true
        };
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedCreateForm = {
            ...this.state.createForm
        };

        const updatedFormElement = {...updatedCreateForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;

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
        if (inputIdentifier === 'retiredYear' || inputIdentifier === 'productionYear') {
            updatedFormElement.errHelperText = `${inputIdentifier} must be between 1950 and 2050`;
            if (updatedFormElement.value === "") {
                updatedFormElement.value = null;
                updatedFormElement.valid = true;
            }
        }

        updatedCreateForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for (let inputIdentifier in updatedCreateForm) {
            isFormValid = updatedCreateForm[inputIdentifier].valid && isFormValid;
        }

        //create form should now have all elements including multiselect
        this.setState({createForm: updatedCreateForm, isFormValid: isFormValid});
    };

    onBlur = (event, identifier) => {
        if (identifier === 'keyname') {
            this.props.doesExistInitiate();
            this.props.doesExist({modelInstance: 'applications', field: identifier, target: event.target.value});
        }
    };

    save = () => {
        if (!this.state.isFormValid) {
            this.props.showNotification({message: 'Validation Error: Fix fields before continuing', type: 'warning'});
            const updatedCreateForm = {...this.state.createForm};
            for (let inputIdentifier in updatedCreateForm) {
                const updatedCreateFormElem = {...updatedCreateForm[inputIdentifier]};
                updatedCreateFormElem.touched = true;
                updatedCreateForm[inputIdentifier] = updatedCreateFormElem;
            }
            this.setState({createForm: updatedCreateForm});
        } else {

            const applicationForm = {};
            for (let formElem in this.state.createForm) {
                applicationForm[formElem] = this.state.createForm[formElem].value;
            }

            const applicationConsolidatedForm = {};
            const applicationConsolidated = {...this.state.multipleSelect};

            for (let formElem in applicationConsolidated) {
                applicationConsolidated[formElem].value = applicationConsolidated[formElem].value ? removeDuplicates(applicationConsolidated[formElem].value, 'id') :
                    null;
                applicationConsolidatedForm[formElem] = applicationConsolidated[formElem].value;
            }

            this.handleSubmit(applicationForm, applicationConsolidatedForm);
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errMessage) {
            this.props.showNotification({
                message: `Create Application Fail: ${nextProps.errMessage}`,
                    type: 'warning'
            })
        }
        if (nextProps.application.saved) {
            this.props.history.push('/applications');
            this.props.showNotification({
                message: `Create Application Success`,
                type: 'info'
            })
        }

        const updateCreateForm = {...this.state.createForm};
        if (nextProps.application.exists) {
            const updatedFormElement = {...updateCreateForm['keyname']};
            updatedFormElement.valid = !nextProps.application.exists;
            updatedFormElement.errHelperText = 'Already Exists';
            updateCreateForm['keyname'] = updatedFormElement;
        }
        for (let inputIdentifier in updateCreateForm) {
            const updatedFormElem = {...updateCreateForm[inputIdentifier]};
            if (updatedFormElem.elementConfig && updatedFormElem.elementConfig.alien) {
                const updatedElemConfig = {...updateCreateForm[inputIdentifier].elementConfig};
                updatedElemConfig.choices = nextProps.application[updatedFormElem.elementConfig.endpoint] ?
                    nextProps.application[updatedFormElem.elementConfig.endpoint] : [];
                updatedFormElem.elementConfig = updatedElemConfig;
            }
            updateCreateForm[inputIdentifier] = updatedFormElem;
        }
        const updatedMultiSelect = {...this.state.multipleSelect};
        for (let inputIdentifier in updatedMultiSelect) {
            const updatedFormElem = {...updatedMultiSelect[inputIdentifier]};
            const updatedElemConfig = {...updatedFormElem.elementConfig};
            updatedElemConfig.choices = nextProps.application[updatedFormElem.elementConfig.endpoint] ?
                nextProps.application[updatedFormElem.elementConfig.endpoint] : [];
            updatedFormElem.elementConfig = updatedElemConfig;
            updatedMultiSelect[inputIdentifier] = updatedFormElem;
        }
        this.setState({createForm: updateCreateForm, multipleSelect: updatedMultiSelect});

    }

    handleSubmit (app, updatedApp) {
        return new Promise ((resolve, reject) => this.props.saveNewApplication(app, updatedApp, resolve, reject));
    }


    render() {
        const formElements = [];
        const consolidatedForm = {...this.state.createForm, ...this.state.multipleSelect};
        for (let key in consolidatedForm) {
            formElements.push({
                id: key,
                config: this.state.createForm[key] ? this.state.createForm[key] : this.state.multipleSelect[key]
            })
        }
        let form = (
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
                    onBlur={(event) => this.onBlur(event, elem.id)}
                    changed={(event) => this.inputChangedHandler(event, elem.id)}
                />
            )})
        );
        return (
            <SimpleForm resource="applications" save={this.save}>
                {form}
            </SimpleForm>)
    }
}

const mapStateToProps = state => ({application: state.application, errMessage: state.application.errorMessage, exists: state.application.exists});

function mapDispatchToProps(dispatch) {
    return {
        saveApplicationStart: bindActionCreators(saveApplicationStart, dispatch),
        saveNewApplication: bindActionCreators(saveNewApplication, dispatch),
        saveApplication: bindActionCreators(saveApplication, dispatch),
        showNotification: bindActionCreators((payload) => {return {type: 'RA/SHOW_NOTIFICATION', payload: payload}}, dispatch),
        doesExistInitiate: bindActionCreators(doesExistInitiate, dispatch),
        doesExist: bindActionCreators(doesExist, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ApplicationCreateForm));

