//migration de vehicles creada por sequelize-cli y editada por nosotros
'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('vehicles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        plate : {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        brand: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        model: {
          allowNull: false,
          type: Sequelize.STRING
        },
        external_damages: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        internal_damages: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        comments: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        image_vehicle: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        id_vehicle_type: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        is_active: {
          allowNull: false,
          type: Sequelize.BOOLEAN
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, /*Sequelize*/) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('vehicles', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}