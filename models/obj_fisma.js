/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var fisma = sequelize.define('fisma', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'Id'
		},
		keyname: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'Keyname'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Description'
		},
		fismaSysId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'FISMA_Sys_Id'
		},
		fedCtrLocated: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Fed_Ctr_Located'
		},
		atoDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'ATODate'
		},
		interimAto: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Interim_ATO'
		},
		atoRenewalDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'ATO_Renewal_Date'
		},
		inactiveDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'InactiveDate'
		},
		currentFyFismaAssessment: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Current_FY_FISMA_Assessment'
		},
		pii: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PII'
		},
		cloudHosted: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'CloudHosted'
		},
		comments: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Comments'
		},
		fscloudstId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'obj_fscloudst_Id'
		},
		createDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW(),
			field: 'CreateDTG'
		},
		changeDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW(),
			field: 'ChangeDTG'
		},
		createAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'CreateAudit'
		},
		changeAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ChangeAudit'
		}
	},
	{
		timestamps: false,
		tableName: 'obj_fisma',
	});

	fisma.associate = function (models) {
		models.fisma.belongsToMany(models.fismaArtifact, { through: 'zk_fisma_artifact' });
		models.fisma.belongsToMany(models.poc, { through: 'zk_fisma_issm' });
		models.fisma.belongsToMany(models.poc, { through: 'zk_fisma_isso' });
		models.fisma.belongsToMany(models.fisma, { as: 'fisma_replacer', through: 'zk_fisma_replacedby' });
		models.fisma.belongsToMany(models.technology, { through: 'zk_fisma_technology' });
	}

	return fisma;
};
