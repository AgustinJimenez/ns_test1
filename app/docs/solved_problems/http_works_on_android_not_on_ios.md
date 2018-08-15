SET SAppTransportSecurity in info.plist

/Users/agus/repositories/working/dls_gestion/ns_test1/platforms/ios/nstest1/nstest1-Info.plist

===============================================================================================
    <key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
		<key>NSExceptionDomains</key>
		<dict>

			<key>http://gestion.dls.com.py</key>
			<dict>

				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>

				<!--Include to allow subdomains-->
				<key>NSIncludesSubdomains</key>
				<true/>

				<!--Include to allow HTTP requests-->
				<key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
				<true/>

				<!--Include to specify minimum TLS version-->
				<key>NSTemporaryExceptionMinimumTLSVersion</key>
				<string>TLSv1.1</string>

			</dict>

		</dict>
	</dict>
===============================================================================================

