<xsl:stylesheet xmlns:xsl = "http://www.w3.org/1999/XSL/Transform" version = "1.0" >
<xsl:output omit-xml-declaration="yes" method="text" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" indent="no" encoding="UTF-8" /><xsl:strip-space elements="*"/>
<xsl:template match = "/icestats" >{<xsl:for-each select="source">
<xsl:if test="string-length(stream_start_iso8601) != 0">
    "<xsl:value-of select="substring(@mount,2)" />": {
    	"title" : "<xsl:value-of select="title" />"
    }<xsl:if test="position() != last()"><xsl:text>,</xsl:text></xsl:if>
    </xsl:if></xsl:for-each>
}</xsl:template>
</xsl:stylesheet>