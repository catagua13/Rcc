using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatApp.Migrations
{
    public partial class RccMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rcc",
                columns: table => new
                {
                    RccId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RccDetailId = table.Column<int>(type: "int", nullable: false),
                    RCCDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    account = table.Column<int>(type: "int", nullable: false),
                    EquipmentTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ServiceTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CompanyTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rcc", x => x.RccId);
                });

            migrationBuilder.CreateTable(
                name: "RccDetail",
                columns: table => new
                {
                    RccDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CollaboratorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Phoneline = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ValueServices = table.Column<int>(type: "int", nullable: false),
                    ValueDevices = table.Column<int>(type: "int", nullable: false),
                    Fee = table.Column<int>(type: "int", nullable: false),
                    TotalFee = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaidBy = table.Column<bool>(type: "bit", nullable: false),
                    Subsidy = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Group = table.Column<short>(type: "smallint", nullable: false),
                    CICollaborator = table.Column<short>(type: "smallint", nullable: false),
                    RccId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RccDetail", x => x.RccDetailId);
                    table.ForeignKey(
                        name: "FK_RccDetail_Rcc_RccId",
                        column: x => x.RccId,
                        principalTable: "Rcc",
                        principalColumn: "RccId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RccDetail_RccId",
                table: "RccDetail",
                column: "RccId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RccDetail");

            migrationBuilder.DropTable(
                name: "Rcc");
        }
    }
}
