import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, Filter
  , CardActions, CreateButton, RefreshButton
  , DateField
  , SimpleForm, DisabledInput, LongTextInput, TextInput, DateInput
  , ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput
  , SimpleFormIterator, ArrayInput
  , required, maxLength } from 'react-admin';

import { ConfirmChoices, FedOrContractor, Fips199 } from './valuelists';
import { formatDate, parseDate } from './formatters/DateTime';

const ListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter, push }) => (
    <CardActions>
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) }
        <CreateButton basePath={basePath} />
        <RefreshButton />
    </CardActions>
);

const KeynameFilter = props => (
    <Filter {...props}>
      <TextInput label="keyname" source="kn" />
    </Filter>
);

export const FismaList = (props) => (
  <List {...props} actions={<ListActions />} title="FISMA Systems" filters={<KeynameFilter />} >
    <Datagrid>
      <TextField source="id" />
      <TextField source="keyname" />
      <DateField source="createDtg" showTime />
      <DateField source="changeDtg" showTime />
      <EditButton />
    </Datagrid>
  </List>
);

const FismaTitle = ({ record }) => {
  return <span>Fisma {record ? `"${record.keyname}"` : ''}</span>;
};

export const FismaEdit = (props) => (
  <Edit keyname={<FismaTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="keyname" validate={[required(), maxLength(80)]} />
      <LongTextInput source="description" />
      <TextInput source="fismaSysId" />
      <SelectInput source="fedCtrLocated" allowEmpty
        optionText="name" optionValue="name"
        choices={ FedOrContractor }
      />
    <DateInput source="atoDate"
      format={formatDate} parse={parseDate} />
      <SelectInput source="interimAto" label="Interim ATO" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <DateInput source="atoRenewalDate"
        format={formatDate} parse={parseDate} />
      <DateInput source="inactiveDate"
        format={formatDate} parse={parseDate} />
      <SelectInput source="currentFyFismaAssessment" label="Current FY FISMA Assessment"
        allowEmpty optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="pii" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="cloudHosted" label="Cloud Hosted" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="Cloud Service Type" source="fscloudstId" reference="fsCloudSt" allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <LongTextInput source="comments" />

{/* ARTIFACTS */}
      <ArrayInput source="fismaArtifacts"  label="FISMA Artifacts">
        <SimpleFormIterator>
          <ReferenceInput label="Art" source="art" reference="fismaArtifact" allowEmpty>
            <SelectInput optionText="keyname" optionValue="id" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
{/* POC isso,issm,ao,so */}
      <ReferenceInput source="authorizingOfficialId" label="Authorizing Official"
        reference="poc"
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      >
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="systemOwnerId" label="System Owner"
        reference="poc"
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      >
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceArrayInput source="isso" label="ISSO"
        reference="poc"
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      >
        <SelectArrayInput optionText="keyname" optionValue="id" />
      </ReferenceArrayInput>
      <ReferenceArrayInput source="issm" label="ISSM"
        reference="poc"
        sort={{ field: 'keyname', order: 'ASC' }}
        perPage={ 1000000 }
      >
        <SelectArrayInput optionText="keyname" optionValue="id" />
      </ReferenceArrayInput>
      <ArrayInput source="fisma_replacedby">
        <SimpleFormIterator>
          <TextInput source="keyname" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="technologies">
        <SimpleFormIterator>
          <TextInput source="keyname" />
        </SimpleFormIterator>
      </ArrayInput>
{/* RECENT ADDITIONS */}
      <ReferenceInput source="scImpactLevelId" label="FIPS 199"
        reference="scImpactLevel"
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="ssoId" label="Responsible SSO"
        reference="organization"
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="atoTypeId" label="ATO Type"
        reference="atoType"
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="fscloudspId" label="Cloud Service Provider"
        reference="fsCloudSp"
        allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>

    </SimpleForm>
  </Edit>
);

export const FismaCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="keyname" validate={[required(), maxLength(80)]} />
      <LongTextInput source="description" />
      <TextInput source="fismaSysId" label="FISMA System ID"/>
      <SelectInput source="fedCtrLocated" allowEmpty
        optionText="name" optionValue="name"
        choices={ FedOrContractor }
      />
      <DateInput source="atoDate" label="ATO Date"
        format={formatDate} parse={parseDate} />
      <SelectInput source="interimAto" label="Interim ATO" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <DateInput source="atoRenewalDate" label="ATO Renewal Date"
        format={formatDate} parse={parseDate} />
      <DateInput source="inactiveDate" label="Inactive Date"
        format={formatDate} parse={parseDate} />
      <SelectInput source="currentFyFismaAssessment" label="Current FY FISMA Assessment"
        allowEmpty optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <SelectInput source="pii" label="PII" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="SO" source="obj_poc_so_Id"
        reference="poc" allowEmpty>
        <SelectInput optionText="keyname" />
      </ReferenceInput>
      <SelectInput source="cloudHosted" label="Cloud Hosted" allowEmpty
        optionText="name" optionValue="name"
        choices={ ConfirmChoices }
      />
      <ReferenceInput label="Cloud Service Type" source="fscloudstId" reference="fsCloudSt" allowEmpty>
        <SelectInput optionText="keyname" optionValue="id" />
      </ReferenceInput>
      <LongTextInput source="comments" />
      <ArrayInput source="fismaArtifacts"  label="FISMA Artifacts">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="link" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="fisma_issm" label="ISSM">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="email" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="fisma_isso" label="ISSO">
        <SimpleFormIterator>
          <TextInput source="keyname" />
          <TextInput source="email" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="fisma_replacedby">
        <SimpleFormIterator>
          <TextInput source="keyname" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="technologies">
        <SimpleFormIterator>
          <TextInput source="keyname" />
        </SimpleFormIterator>
      </ArrayInput>

    </SimpleForm>
  </Create>
);
