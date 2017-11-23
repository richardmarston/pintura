<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    version="1.0">
    <xsl:output omit-xml-declaration="yes" indent="yes"/>
    <xsl:strip-space elements="*"/>
    <xsl:template match="/">
        <xsl:for-each select="xs:schema/xs:complexType">
        <xsl:sort select="@name"/>
            <xsl:text>    </xsl:text>
            <li class="wide-row floating-panel-item dark-grey-background">
                <xsl:attribute name="id">
                    <xsl:value-of select="@name"/>
                </xsl:attribute>
                <xsl:text>&#xa;        </xsl:text>
                <button class="component-type-name row button wide-button dark-grey-background">
                    <xsl:value-of select="@name"/>
                </button>
                <xsl:text>&#xa;    </xsl:text>
            </li>
            <xsl:text>&#xa;</xsl:text>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
